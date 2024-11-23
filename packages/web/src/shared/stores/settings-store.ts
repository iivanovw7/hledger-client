import type { DateTime } from "luxon";

import type { LoadingType } from "#/common";
import type { Theme } from "#/styles";
import type { Nullable } from "#/utils";

declare global {
	type IGlobalStore = {
		settings: SettingsStore;
	};
}

type SettingsSoreState = {
	progressQueue: number;
	theme: Theme;
	updatedLast: Nullable<DateTime>;
	waitQueue: number;
};

type SettingsStoreActions = {
	completeProgress: () => void;
	completeWait: () => void;
	setGlobalLoading: (type: LoadingType) => (isLoading: boolean) => void;
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
		progressQueue: 0,
		theme: "dark",
		updatedLast: null,
		waitQueue: 0,
	});

	let startWait = () => {
		setState(({ waitQueue }) => ({
			waitQueue: waitQueue + 1,
		}));
	};

	let startProgress = () => {
		setState(({ progressQueue }) => ({
			progressQueue: progressQueue + 1,
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
				waitQueue: waitQueue - 1,
			}));
		}
	};

	let stopProgress = () => {
		if (state.progressQueue > 0) {
			setState(({ progressQueue }) => ({
				progressQueue: progressQueue - 1,
			}));
		}
	};

	let completeProgress = () => {
		if (state.progressQueue > 0) {
			setState({
				progressQueue: 0,
			});
		}
	};

	let completeWait = () => {
		if (state.waitQueue > 0) {
			setState({
				waitQueue: 0,
			});
		}
	};

	return {
		actions: {
			completeProgress,
			completeWait,
			setGlobalLoading: (type: LoadingType) => {
				let isWait = type === "wait";

				return (isLoading: boolean) => {
					if (isLoading) {
						if (isWait) {
							startWait();
						} else {
							startProgress();
						}
					} else if (isWait) {
						stopWait();
					} else {
						stopProgress();
					}
				};
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
