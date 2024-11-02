import { lazyImport, routePath } from "@/shared";
import { Navigate, Route, Router } from "@solidjs/router";

import { withRootLayout } from "./root-layout";

const { Transactions } = lazyImport(() => import("./transactions"));
const { Accounts } = lazyImport(() => import("./accounts"));
const { Statistics } = lazyImport(() => import("./statistics"));
const { Settings } = lazyImport(() => import("./settings"));

const { accounts, home, settings, statistics, transactions } = routePath;

export const Routing = () => (
	<Router>
		<Route component={withRootLayout(Accounts)} path={accounts} />
		<Route component={withRootLayout(Transactions)} path={transactions} />
		<Route component={withRootLayout(Settings)} path={settings} />
		<Route component={withRootLayout(Statistics)} path={statistics} />
		<Route component={() => <Navigate href={accounts} />} path={home} />
		<Route component={() => <Navigate href={accounts} />} path="/" />
	</Router>
);
