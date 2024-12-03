import { Tabs } from "@kobalte/core/tabs";
import type { TabsContentProps } from "@kobalte/core/tabs";

import { bem } from "@/shared";

import css from "./tabs-content.module.scss";

const { cls } = bem(css);

export type TabsContentProperties = {
	children?: JSX.Element | JSX.Element[];
} & TabsContentProps;

export const TabsContent: Component<TabsContentProperties> = (propertes) => {
	return (
		<Tabs.Content class={cls.tabsContent.block()} {...propertes}>
			{propertes.children}
		</Tabs.Content>
	);
};
