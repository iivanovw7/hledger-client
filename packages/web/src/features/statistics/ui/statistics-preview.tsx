import { bem, Tabs } from "@/shared";

import { TransactionType } from "../model/models";
import { StatisticsChart } from "./statistics-chart";
import { StatisticsTable } from "./statistics-table";
import { StatisticsToolbar } from "./statistics-toolbar";

import css from "./statistics-preview.module.scss";

const { cls } = bem(css);

export const StatisticsPreview = () => (
	<div class={cls.statisticsPreview.block()}>
		<StatisticsToolbar />
		<div class={cls.statisticsPreview.list()}>
			<Tabs class={cls.statisticsPreview.tabs()} defaultValue={TransactionType.EXPENSES}>
				<Tabs.List class={cls.statisticsPreview.tabsList()}>
					<Tabs.Trigger value={TransactionType.INCOMES}>{TransactionType.INCOMES}</Tabs.Trigger>
					<Tabs.Trigger value={TransactionType.EXPENSES}>{TransactionType.EXPENSES}</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value={TransactionType.INCOMES}>
					<StatisticsChart type={TransactionType.INCOMES} />
					<StatisticsTable type={TransactionType.INCOMES} />
				</Tabs.Content>
				<Tabs.Content value={TransactionType.EXPENSES}>
					<StatisticsChart type={TransactionType.EXPENSES} />
					<StatisticsTable type={TransactionType.EXPENSES} />
				</Tabs.Content>
			</Tabs>
		</div>
	</div>
);
