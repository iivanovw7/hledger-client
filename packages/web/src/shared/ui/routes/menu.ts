import { pipe, prop, sortBy, values } from "ramda";

import type { IconName } from "../components";

import { routePath } from "./routes";

const { accounts, settings, statistics, transactions } = routePath;

export type MenuItem = {
	disabled?: boolean;
	icon?: IconName;
	order: number;
	replace?: boolean;
	text: string;
	to: string;
};

export const menuItemSet: Record<string, MenuItem> = {
	accounts: {
		icon: "wallet",
		order: 2,
		text: "Accounts",
		to: accounts,
	},
	settings: {
		icon: "settings",
		order: 3,
		text: "Settings",
		to: settings,
	},
	statistics: {
		disabled: true,
		icon: "chart-area",
		order: 1,
		text: "Statistics",
		to: statistics,
	},
	transactions: {
		icon: "list",
		order: 0,
		text: "Transactions",
		to: transactions,
	},
};

const sortByOrder = sortBy(prop("order"));

/**
 * Creates a list of navigation options.
 */
export const menuItems: MenuItem[] = pipe(values, sortByOrder)(menuItemSet);
