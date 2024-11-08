import { bem, capitalize, Collapsible, Icon } from "@/shared";

import type { AccountRootItem } from "../model/models";

import { getAiBalance, getChildItemLabel, sortByBalance } from "../lib";

import css from "./account-card.module.scss";

const { cls } = bem(css);

export type AccountCardProperties = {
	account: AccountRootItem;
};

export const AccountCard = (properties: AccountCardProperties) => (
	<Collapsible
		class={cls.accountCard.block()}
		style={{ "--account-card-border-color": `var(--${properties.account.color})` }}>
		<Collapsible.Trigger class={cls.accountCard.toggle()}>
			<div class={cls.accountCard.label()}>
				<Icon class={cls.accountCard.labelIcon()} name={properties.account.icon} />
				<h4 class={cls.accountCard.labelText()}>{capitalize(properties.account.aname)}</h4>
			</div>
			<span>{getAiBalance(properties.account)}</span>
		</Collapsible.Trigger>
		<Collapsible.Content class={cls.accountCard.content()}>
			<For each={sortByBalance(properties.account.items)}>
				{(item) => (
					<div class={cls.accountCard.contentItem()}>
						<span class={cls.accountCard.contentItemText()}>{getChildItemLabel(item.aname)}</span>
						<span>{getAiBalance(item)}</span>
					</div>
				)}
			</For>
		</Collapsible.Content>
	</Collapsible>
);
