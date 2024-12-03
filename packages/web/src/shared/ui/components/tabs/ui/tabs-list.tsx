import { Tabs } from "@kobalte/core/tabs";
import type { TabsListProps } from "@kobalte/core/tabs";

import { bem } from "@/shared";

import css from "./tabs-list.module.scss";

const { cls } = bem(css);

export type TabsListProperties = {
	children?: JSX.Element | JSX.Element[];
	class?: string;
	indicatorClass?: string;
} & TabsListProps;

export const TabsList: Component<TabsListProperties> = (properties) => {
	let [local, others] = splitProps(properties, ["class", "indicatorClass"]);

	return (
		<Tabs.List class={cls.tabsList.block(null, local.class)} {...others}>
			{properties.children}
			<Tabs.Indicator class={cls.tabsList.indicator(null, local.indicatorClass)} />
		</Tabs.List>
	);
};
