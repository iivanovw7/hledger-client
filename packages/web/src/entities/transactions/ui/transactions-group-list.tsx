import { bem, Combobox } from "@/shared";

import type { TransactionDateGroups } from "../model/models";

import { useTransactionsStore } from "../model";
import { TransactionGroup } from "./transactions-group";

import css from "./transactions-group-list.module.scss";

const { cls } = bem(css);

export type TransactionsGroupListProperties = {
	accountNames?: string[];
	groups: TransactionDateGroups;
};

export const TransactionsGroupList = (properties: TransactionsGroupListProperties) => {
	let { actions: transactionsActions, state: transactionsState } = useTransactionsStore();

	let onInputChange = (value: string) => {
		if (value === "") {
			transactionsActions.setFilter("");
		}
	};

	let transactionLists = createMemo(() => {
		let entries = Object.entries(properties.groups);

		return entries.map((entry, index) => ({
			current: entry,
			previous: index > 0 ? entries[index - 1] : null,
		}));
	});

	return (
		<div class={cls.transactionsGroupList.block()}>
			<div class={cls.transactionsGroupList.header()}>
				<Combobox
					class={cls.transactionsGroupList.combobox()}
					disabled={!properties.accountNames?.length}
					isClearable={transactionsState.filter.length > 0}
					onChange={transactionsActions.setFilter}
					onClear={() => transactionsActions.setFilter("")}
					onInputChange={onInputChange}
					options={properties.accountNames || []}
					placeholder="Account name"
					value={transactionsState.filter}
				/>
			</div>
			<div class={cls.transactionsGroupList.list()} tabindex={-1}>
				<For each={transactionLists()}>
					{({ current: [date, transactions], previous }) => (
						<TransactionGroup
							date={date}
							filter={transactionsState.filter}
							previousDate={previous ? previous[0] : null}
							transactions={transactions}
						/>
					)}
				</For>
			</div>
		</div>
	);
};
