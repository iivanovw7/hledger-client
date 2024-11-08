import { bem } from "@/shared";

import type { AccountRootItem } from "../model/models";

import { AccountCard } from "./account-card";

import css from "./account-card-list.module.scss";

const { cls } = bem(css);

export type AccountCardListProperties = {
	accounts: AccountRootItem[];
};

export const AccountCardList = (properties: AccountCardListProperties) => {
	return (
		<div class={cls.accountCardList.block()}>
			<For each={properties.accounts}>{(account) => <AccountCard account={account} />}</For>
		</div>
	);
};
