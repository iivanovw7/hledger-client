import { bem } from "@/shared";

import { StatisticsChart } from "./statistics-chart";
import { StatisticsToolbar } from "./statistics-toolbar";

import css from "./statistics-preview.module.scss";

const { cls } = bem(css);

export const StatisticsPreview = () => (
	<div class={cls.statisticsPreview.block()}>
		<StatisticsToolbar />
		<StatisticsChart />
	</div>
);
