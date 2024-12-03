import { Tabs } from "@kobalte/core/tabs";
import type { TabsTriggerProps } from "@kobalte/core/tabs";

import { bem } from "@/shared";

import css from "./tabs-trigger.module.scss";

const { cls } = bem(css);

export type TabsTriggerProperties = {
	children?: JSX.Element | JSX.Element[];
} & TabsTriggerProps;

export const TabsTrigger: Component<TabsTriggerProperties> = (properties) => {
	return (
		<Tabs.Trigger class={cls.tabsTrigger.block()} {...properties}>
			{properties.children}
		</Tabs.Trigger>
	);
};
