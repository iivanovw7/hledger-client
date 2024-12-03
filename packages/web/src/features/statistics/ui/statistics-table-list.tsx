import { DateTime } from "luxon";

import { bem } from "@/shared";

import type { MonthTableAccountData } from "../lib";

import css from "./statistics-table-list.module.scss";

const { cls } = bem(css);

export type StatatisticsTableListProperties = {
	data: MonthTableAccountData["ptransactions"];
};

export const StatisticsTableList: Component<StatatisticsTableListProperties> = (properties) => {
	let { data } = properties;

	return (
		<ul class={cls.tableList.block()}>
			{data.map((transaction) => (
				<li class={cls.tableList.element()}>
					<div class={cls.tableList.elementSection()}>
						<span>{DateTime.fromISO(transaction.date).toFormat("dd MMM")} - </span>
						<span>{transaction.description}</span>
					</div>
					<div class={cls.tableList.elementSection()}>
						<span>{transaction.commodity}</span>
						<span>{transaction.value}</span>
					</div>
				</li>
			))}
		</ul>
	);
};
