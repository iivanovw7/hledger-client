import { DateTime } from "luxon";

import { any } from "ramda";

import type { Transaction } from "#/api";
import type { Nullable } from "#/utils";

import type { TransactionPosting } from "../model/models";

export type FormattedGroupDate = {
	date: string;
	postfix: string;
};

export const formatGroupDate = (dateInput: string, previousDateInput: Nullable<string>): FormattedGroupDate => {
	let date = DateTime.fromISO(dateInput);
	let now = DateTime.now();
	let previousDate = previousDateInput ? DateTime.fromISO(previousDateInput) : now;
	let isNewMonth = date.month !== previousDate.month;
	let dateString = date.toLocaleString(DateTime.DATE_MED);
	let postfix = "";

	if (date.hasSame(now, "day")) {
		postfix = "Today";
	}

	if (date.hasSame(now.minus({ days: 1 }), "day")) {
		postfix = "Yesterday";
	}

	if (!postfix && date.hasSame(date.endOf("month"), "day") && isNewMonth) {
		postfix = date.toFormat("MMMM");
	}

	return {
		date: dateString,
		postfix,
	};
};

const hasAccountPrefix = (prefix: string) => {
	return ({ paccount }: TransactionPosting) => paccount.startsWith(prefix);
};

export const isSpendingTransaction = (transaction: Transaction) => {
	return any(hasAccountPrefix("expenses:"), transaction.tpostings);
};

export const isIncomingTransaction = (transaction: Transaction) => {
	return any(hasAccountPrefix("income:"), transaction.tpostings);
};
