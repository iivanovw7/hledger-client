import type { IconName } from "@/shared";
import type { Account } from "#/api";
import type { AccountColor } from "#/styles";

export type AccountRootItem = {
	color: AccountColor;
	icon: IconName;
	items: Account[];
	itemsCount: number;
} & Account;
