import { bem } from "@/shared";

import type { TransactionPosting } from "../model/models";

import css from "./transactions-group-record.module.scss";

const { cls } = bem(css);

export type TransactionGroupRecordProperties = {
	filter?: string;
	posting: TransactionPosting;
};

export const TransactionGroupRecord = (properties: TransactionGroupRecordProperties) => (
	<div class={cls.transactionGroupRecord.block()}>
		<span
			class={cls.transactionGroupRecord.accountName({
				isHighlighted: properties.filter === properties.posting.paccount,
			})}>
			{properties.posting.paccount}
		</span>
		<For each={properties.posting.pamount}>
			{(pamount) => (
				<span class={cls.transactionGroupRecord.value()}>
					<span>{pamount.acommodity || ""}</span>
					<span>{pamount.aquantity.floatingPoint}</span>
				</span>
			)}
		</For>
	</div>
);
