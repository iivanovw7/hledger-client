import { bem } from "@/shared";

import type { TransactionDateGroups } from "../model/models";

import { TransactionGroup } from "./transactions-group";

import css from "./transactions-group-list.module.scss";

const { cls } = bem(css);

export type TransactionsGroupListProperties = {
	groups: TransactionDateGroups;
};

export const TransactionsGroupList = (properties: TransactionsGroupListProperties) => {
	let transactionLists = createMemo(() => {
		let entries = Object.entries(properties.groups);

		return entries.map((entry, index) => ({
			current: entry,
			previous: index > 0 ? entries[index - 1] : null,
		}));
	});

	return (
		<div class={cls.transactionsGroupList.block()} tabindex={-1}>
			<For each={transactionLists()}>
				{({ current: [date, transactions], previous }) => (
					<TransactionGroup
						date={date}
						previousDate={previous ? previous[0] : null}
						transactions={transactions}
					/>
				)}
			</For>
		</div>
	);
};
