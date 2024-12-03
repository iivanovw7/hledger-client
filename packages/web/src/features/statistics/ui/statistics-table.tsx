import type { ColumnDef } from "@tanstack/solid-table";

import { useTransactionsStore } from "@/entities";
import { bem, Collapsible, Icon } from "@/shared";
import { createSolidTable, flexRender, getCoreRowModel } from "@tanstack/solid-table";

import type { MonthTableAccountData, MonthTableData } from "../lib";

import { getMonthTableData } from "../lib";
import { useStatisticsStore } from "../model";
import { StatisticsTableList } from "./statistics-table-list";

import css from "./statistics-table.module.scss";

const { cls } = bem(css);

const defaultColumns: ColumnDef<MonthTableAccountData>[] = [
	{
		accessorKey: "percentage",
		cell: (properties) => {
			return `${Number(properties.getValue()).toFixed()}%`;
		},
		header: "%",
	},
	{
		accessorKey: "label",
		cell: (properties) => properties.getValue(),
		header: "Account",
	},
	{
		accessorKey: "value",
		cell: (properties) => {
			return `${properties.row.original.commodity} ${properties.getValue()}`;
		},
		header: "Total",
	},
];

export const StatisticsTable: Component = () => {
	let { state } = useStatisticsStore();
	let { state: transactionsState } = useTransactionsStore();
	let [tableData, setTableData] = createSignal<MonthTableData>({
		data: [],
		total: 0,
	});

	let table = createSolidTable<MonthTableAccountData>({
		columns: defaultColumns,
		get data() {
			return tableData().data;
		},
		getCoreRowModel: getCoreRowModel(),
	});

	createEffect(() => {
		setTableData(getMonthTableData(transactionsState.transactions, state.chartSetting.Monthly));
	});

	return (
		<div class={cls.statisticsTable.container()}>
			<table class={cls.statisticsTable.block()}>
				<thead>
					<For each={table.getHeaderGroups()}>
						{(headerGroup) => (
							<tr>
								<For each={headerGroup.headers}>
									{(header) => {
										let content = flexRender(header.column.columnDef.header, header.getContext());

										return (
											<th class={cls.statisticsTable.th(null, header.column.id)}>
												{header.isPlaceholder ? null : content}
											</th>
										);
									}}
								</For>
							</tr>
						)}
					</For>
				</thead>
				<tbody>
					<For each={table.getRowModel().rows}>
						{(row) => (
							<tr>
								<For each={row.getVisibleCells()}>
									{(cell) => {
										let content = flexRender(cell.column.columnDef.cell, cell.getContext());

										return (
											<td
												class={cls.statisticsTable.td(null, cell.column.id)}
												style={{ "--color": cell.row.original.color }}>
												<Switch
													fallback={
														<div class={cls.statisticsTable.cell()}>
															<span>{content}</span>
														</div>
													}>
													<Match when={cell.column.id === "percentage"}>
														<div class={cls.statisticsTable.percentageCell()}>
															<span>{content}</span>
														</div>
													</Match>
													<Match when={cell.column.id === "label"}>
														<Collapsible>
															<Collapsible.Trigger
																class={cls.statisticsTable.labelCell()}>
																<span>{content}</span>
																<Icon
																	containerClass="icon-container"
																	name="chevron-down"
																	size="small"
																/>
															</Collapsible.Trigger>
															<Collapsible.Content
																class={cls.statisticsTable.labelCellContainer()}>
																<StatisticsTableList
																	data={cell.row.original.ptransactions}
																/>
															</Collapsible.Content>
														</Collapsible>
													</Match>
												</Switch>
											</td>
										);
									}}
								</For>
							</tr>
						)}
					</For>
				</tbody>
			</table>
		</div>
	);
};
