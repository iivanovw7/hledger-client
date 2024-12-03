import { bem, Tabs } from "@/shared";

import { StatisticsChart } from "./statistics-chart";
import { StatisticsTable } from "./statistics-table";
import { StatisticsToolbar } from "./statistics-toolbar";

import css from "./statistics-preview.module.scss";

const { cls } = bem(css);

export const StatisticsPreview = () => (
	<div class={cls.statisticsPreview.block()}>
		<StatisticsToolbar />
		<Tabs defaultValue="Expences">
			<Tabs.List class={cls.statisticsPreview.tabsList()}>
				<Tabs.Trigger disabled value="Income">
					Income
				</Tabs.Trigger>
				<Tabs.Trigger value="Expences">Expences</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="Income">Income</Tabs.Content>
			<Tabs.Content value="Expences">
				<StatisticsChart />
				<StatisticsTable />
			</Tabs.Content>
		</Tabs>
	</div>
);
