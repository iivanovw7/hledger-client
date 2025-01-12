import type { Nullable } from "#/utils";

import { withLocalStore } from "@/shared";

import { StatsChartPeriod } from "./models";

export type StatisticsStoreState = {
	chartPeriod: StatsChartPeriod;
	chartSetting: {
		[StatsChartPeriod.MONTHLY]: Nullable<string>;
		[StatsChartPeriod.WEEKLY]: Nullable<string>;
	};
};

export type StatisticsStoreActions = {
	setChartMonthSetting: (monthSetting?: Nullable<string>) => void;
	setChartPeriod: (chartPeriod: Nullable<StatsChartPeriod>) => void;
};

export type StatisticsStore = {
	actions: StatisticsStoreActions;
	state: StatisticsStoreState;
};

const createStatisticsStore = (): StatisticsStore => {
	let [state, setState] = createStore<StatisticsStoreState>({
		chartPeriod: StatsChartPeriod.MONTHLY,
		chartSetting: {
			[StatsChartPeriod.MONTHLY]: null,
			[StatsChartPeriod.WEEKLY]: null,
		},
	});

	let actions: StatisticsStoreActions = {
		setChartMonthSetting: (monthSetting?: Nullable<string>) => {
			setState((previousState) => ({
				...previousState,
				chartSetting: { ...previousState.chartSetting, [StatsChartPeriod.MONTHLY]: monthSetting || null },
			}));
		},
		setChartPeriod: (chartPeriod) => {
			if (chartPeriod) {
				setState({ chartPeriod });
			}
		},
	};

	return {
		actions,
		state,
	};
};

export const [useStatisticsStore, withStatisticsStore] = withLocalStore<StatisticsStore>(createStatisticsStore);
