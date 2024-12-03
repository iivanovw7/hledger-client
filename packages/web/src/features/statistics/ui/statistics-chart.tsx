import { Bar } from "solid-chartjs";

import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useTransactionsStore } from "@/entities";
import { bem } from "@/shared";

import type { MonthChartData } from "../lib";

import { getMonthChartData } from "../lib";
import { useStatisticsStore } from "../model";

import css from "./statistics-chart.module.scss";

const { cls } = bem(css);

export const StatisticsChart: Component = () => {
	let { state } = useStatisticsStore();
	let { state: transactionsState } = useTransactionsStore();

	let [chartData, setChartData] = createSignal<MonthChartData>({
		commodities: [],
		data: null,
		options: null,
		total: 0,
	});

	onMount(() => {
		Chart.register(...registerables, ChartDataLabels);
	});

	createEffect(() => {
		setChartData(getMonthChartData(transactionsState.transactions, state.chartSetting.Monthly));
	});

	return (
		<div class={cls.statisticsChart.block()}>
			{!!chartData().total && (
				<div class={cls.statisticsChart.header()}>
					Total expences: {chartData().total.toFixed(2)} {chartData().commodities.at(0) || ""}
				</div>
			)}
			{chartData().data && chartData().options ? (
				<Bar data={chartData().data} options={chartData().options} type="bar" />
			) : (
				<div class={cls.statisticsChart.emptyData()}>
					<p>No data available to display</p>
				</div>
			)}
		</div>
	);
};
