import type { Transaction } from "#/api";
import type { Nullable } from "#/utils";

import { bem, config } from "@/shared";

import { formatGroupDate, isIncomingTransaction, isSpendingTransaction } from "../lib";
import { TransactionGroupRecord } from "./transactions-group-record";

import css from "./transactions-group.module.scss";

const { cls } = bem(css);
const { showTransationDirection } = config.ui;

export type TransactionGroupProperties = {
	date: string;
	previousDate: Nullable<string>;
	transactions: Transaction[];
};

export const TransactionGroup = (properties: TransactionGroupProperties) => {
	let formattedDate = createMemo(() => formatGroupDate(properties.date, properties.previousDate));

	return (
		<div class={cls.transactionGroup.block()}>
			<div class={cls.transactionGroup.header()}>
				<h4>{formattedDate().date}</h4>
				<span class={cls.transactionGroup.headerMonth()}>{formattedDate().postfix}</span>
			</div>
			<For each={properties.transactions}>
				{(transaction) => (
					<div
						class={cls.transactionGroup.card({
							isIncome: showTransationDirection && isIncomingTransaction(transaction),
							isSpending: showTransationDirection && isSpendingTransaction(transaction),
						})}>
						<h5 class={cls.transactionGroup.cardDescription()}>{transaction.tdescription}</h5>
						<For each={transaction.tpostings}>
							{(posting) => <TransactionGroupRecord posting={posting} />}
						</For>
					</div>
				)}
			</For>
		</div>
	);
};
