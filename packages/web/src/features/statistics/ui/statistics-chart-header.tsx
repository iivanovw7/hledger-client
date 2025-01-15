import { bem, capitalize } from "@/shared";

import css from "./statistics-chart-header.module.scss";

const { cls } = bem(css);

type CardProperties = { commodity: string; label: string; value: number };

const Card: Component<CardProperties> = (properties) => (
	<div class={cls.statisticsChartHeader.card()}>
		<h4 class={cls.statisticsChartHeader.label()}>{capitalize(properties.label)}</h4>
		<span
			class={cls.statisticsChartHeader.value({
				expences: properties.label === "expenses",
				incomes: properties.label === "incomes",
			})}>
			{`${properties.value.toFixed(2)} ${properties.commodity}`}
		</span>
	</div>
);

export type StatisticsChartHeaderProperties = {
	commodity: string;
	expences: number;
	incomes: number;
};

export const StatisticsChartHeader: Component<StatisticsChartHeaderProperties> = (properties) => {
	return (
		<div class={cls.statisticsChartHeader.block()}>
			<Card commodity={properties.commodity} label="incomes" value={properties.incomes} />
			<Card commodity={properties.commodity} label="expenses" value={properties.expences} />
			<Card commodity={properties.commodity} label="total" value={properties.incomes - properties.expences} />
		</div>
	);
};
