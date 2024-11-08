import type { DateTime } from "luxon";

import type { Theme } from "#/styles";
import type { Nullable } from "#/utils";

declare global {
	type IGlobalStore = {
		settings: SettingsStore;
	};
}

type SettingsSoreState = {
	theme: Theme;
	updatedLast: Nullable<DateTime>;
	waitQueue: number;
};

type SettingsStoreActions = {
	completeWait: () => void;
	setGlobalLoading: (isLoading: boolean) => void;
	setTheme: (theme: Theme) => void;
	setUpdatedLast: (date: Nullable<DateTime>) => void;
	startWait: () => void;
	stopWait: () => void;
};

export type SettingsStore = {
	actions: SettingsStoreActions;
	state: SettingsSoreState;
};

const createSettingsStore = (): SettingsStore => {
	let [state, setState] = createStore<SettingsSoreState>({
		theme: "dark",
		updatedLast: null,
		waitQueue: 0,
	});

	let startWait = () => {
		setState(({ waitQueue }) => ({
			waitQueue: waitQueue + 1,
		}));
	};

	let setUpdatedLast = (updatedLast: Nullable<DateTime>) => {
		setState({
			updatedLast,
		});
	};

	let stopWait = () => {
		if (state.waitQueue > 0) {
			setState(({ waitQueue }) => ({
				waitProfile: null,
				waitQueue: waitQueue - 1,
			}));
		}
	};

	return {
		actions: {
			completeWait: () => {
				if (state.waitQueue > 0) {
					setState({
						waitQueue: 0,
					});
				}
			},
			setGlobalLoading: (isLoading: boolean) => {
				if (isLoading) {
					startWait();
				} else {
					stopWait();
				}
			},
			setTheme: (theme: Theme) => {
				setState("theme", theme);
			},
			setUpdatedLast,
			startWait,
			stopWait,
		},
		state,
	};
};

export const settingsStore = createRoot(createSettingsStore);
