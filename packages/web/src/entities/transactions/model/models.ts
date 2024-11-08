import type { Transaction } from "#/api";

export type TransactionDateGroups = Record<string, Transaction[]>;

export type TransactionPosting = Transaction["tpostings"][number];
