import type { Theme } from "#/styles";

declare global {
	type IGlobalStore = {
		settings: SettingsStore;
	};
}

type SettingsSoreState = {
	theme: Theme;
	waitQueue: number;
};

type SettingsStoreActions = {
	completeWait: () => void;
	setGlobalLoading: (isLoading: boolean) => void;
	setTheme: (theme: Theme) => void;
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
		waitQueue: 0,
	});

	let startWait = () => {
		setState(({ waitQueue }) => ({
			waitQueue: waitQueue + 1,
		}));
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
			startWait,
			stopWait,
		},
		state,
	};
};

export const settingsStore = createRoot(createSettingsStore);
