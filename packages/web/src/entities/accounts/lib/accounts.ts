import { defaultTo, descend, filter, last, map, pathOr, pipe, prop, propOr, sortWith, split, sum } from "ramda";

import type { Account } from "#/api";

import type { AccountRootItem } from "../model/models";

const hasParent = (value: string) => {
	return (item: Account) => item.aparent_ === value;
};

const hasRootParent = hasParent("root");

const pickItemsCount: (item: AccountRootItem) => number = prop("itemsCount");

const pickAiBalanceProperty = propOr([], "aibalance");

const pickFloatingPoint = pathOr(0, ["aquantity", "floatingPoint"]);

const getRootItem = (rootItems: Account[]) => {
	return (item: Account): AccountRootItem => {
		let items = filter(hasParent(item.aname))(rootItems);

		return {
			...item,
			color: "accent3",
			icon: "banknote",
			items,
			itemsCount: items.length,
		};
	};
};

type PickAccountRootItemsResult = {
	items: AccountRootItem[];
	itemsCount: number;
};

export const pickAccountRootItems = (accountItems: Account[]): PickAccountRootItemsResult => {
	let items = pipe(filter(hasRootParent), map(getRootItem(accountItems)))(accountItems);
	let itemsCount = pipe(map(pickItemsCount), sum)(items);

	return {
		items,
		itemsCount,
	};
};

export const getAiBalance = pipe(pickAiBalanceProperty, map(pickFloatingPoint), sum);

export const getChildItemLabel = pipe(split(":"), last, defaultTo("N/A")) as (value: unknown) => string;

export const sortByBalance = sortWith([descend(getAiBalance)]);
