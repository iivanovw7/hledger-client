import type { Transaction } from "#/api";
import type { Nullable } from "#/utils";

import { bem, settingsStore } from "@/shared";

import { formatGroupDate, isIncomingTransaction, isSpendingTransaction } from "../lib";
import { TransactionGroupRecord } from "./transactions-group-record";

import css from "./transactions-group.module.scss";

const { cls } = bem(css);

export type TransactionGroupProperties = {
	date: string;
	filter?: string;
	previousDate: Nullable<string>;
	transactions: Transaction[];
};

export const TransactionGroup = (properties: TransactionGroupProperties) => {
	let formattedDate = createMemo(() => formatGroupDate(properties.date, properties.previousDate));

	return (
		<div class={cls.transactionGroup.block()}>
			<div class={cls.transactionGroup.header()}>
				<h4>{formattedDate().date}</h4>
				{formattedDate().postfix && (
					<span class={cls.transactionGroup.headerMonth()}>{formattedDate().postfix}</span>
				)}
			</div>
			<For each={properties.transactions}>
				{(transaction) => (
					<div
						class={cls.transactionGroup.card({
							isIncome: settingsStore.state.transactionsHighlight && isIncomingTransaction(transaction),
							isSpending: settingsStore.state.transactionsHighlight && isSpendingTransaction(transaction),
						})}>
						<h5 class={cls.transactionGroup.cardDescription()}>{transaction.tdescription}</h5>
						<For each={transaction.tpostings}>
							{(posting) => <TransactionGroupRecord filter={properties.filter} posting={posting} />}
						</For>
					</div>
				)}
			</For>
		</div>
	);
};
