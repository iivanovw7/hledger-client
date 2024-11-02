import { controller } from "./controller";
import { settingsStore } from "./settings-store";

export const initStores = controller.init({
	settings: settingsStore,
});
