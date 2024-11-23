import type { Nullable } from "#/utils";

import { useTransactionsStore } from "@/entities";
import { bem, Button, Select } from "@/shared";

import { useStatisticsStore } from "../model";
import { StatsChartPeriod } from "../model/models";
import { StatsChartPeriods } from "../model/models";

import css from "./statistics-toolbar.module.scss";

const { cls } = bem(css);

export const StatisticsToolbar = () => {
	let { actions, state } = useStatisticsStore();
	let { state: transactionsState } = useTransactionsStore();

	let isFirstMonth = () => state.chartSetting[state.chartPeriod] === transactionsState.transactionsUniqueMonths[0];
	let isLastMonth = () => state.chartSetting[state.chartPeriod] === transactionsState.transactionsUniqueMonths.at(-1);

	let handlePeriodChange = (period: Nullable<StatsChartPeriod>) => {
		actions.setChartPeriod(period);

		if (period === StatsChartPeriod.MONTHLY) {
			actions.setChartMonthSetting(transactionsState.transactionsUniqueMonths.at(-1));
		}
	};

	let handleMonthChange = (direction: "next" | "prev") => {
		let currentMonth = state.chartSetting[state.chartPeriod];
		let currentIndex = currentMonth
			? transactionsState.transactionsUniqueMonths.indexOf(currentMonth.toString())
			: -1;

		switch (direction) {
			case "next": {
				if (currentIndex < transactionsState.transactionsUniqueMonths.length - 1) {
					actions.setChartMonthSetting(transactionsState.transactionsUniqueMonths[currentIndex + 1]);
				}

				break;
			}
			case "prev": {
				if (currentIndex > 0) {
					actions.setChartMonthSetting(transactionsState.transactionsUniqueMonths[currentIndex - 1]);
				}
			}
		}
	};

	return (
		<div class={cls.statisticsToolbar.block()}>
			<div class={cls.statisticsToolbar.leftSection()}>
				<Button
					color="primary"
					disabled={isFirstMonth()}
					fill="none"
					icon="chevron-left"
					onClick={() => handleMonthChange("prev")}
				/>
				<div>{state.chartSetting[state.chartPeriod]}</div>
				<Button
					color="primary"
					disabled={isLastMonth()}
					fill="none"
					icon="chevron-right"
					onClick={() => handleMonthChange("next")}
				/>
			</div>
			<div class={cls.statisticsToolbar.rightSection()}>
				<Select<StatsChartPeriod>
					onChange={handlePeriodChange}
					options={StatsChartPeriods}
					value={state.chartPeriod}
				/>
			</div>
		</div>
	);
};
