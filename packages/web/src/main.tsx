import { config, env, getLogger, initStores, lazyImport, setLogLevel } from "@/shared";
import { attachDevtoolsOverlay } from "@solid-devtools/overlay";

import "unfonts.css";

import "virtual:svg-icons-register";

import "./shared/ui/styles/main.scss";

const { App } = lazyImport(() => import("./app"));
const { logLevel } = config;
const { isDevelopment } = env;
const MOUNT_NODE = document.body;
const logger = getLogger("Main");

if (isDevelopment) {
	attachDevtoolsOverlay();
}

/** Initializes global stores. */
initStores();

const renderApp = (AppComponent: Component) => {
	render(() => <AppComponent />, MOUNT_NODE);
};

if (isDevelopment && !(MOUNT_NODE instanceof HTMLElement)) {
	logger.error("Root element not found.");
}

/** Sets current log level. */
logger.info(`Loglevel: ${logLevel}`);
setLogLevel(logLevel);

/** Renders application at specified mount point. */
renderApp(App);
