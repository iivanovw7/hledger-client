import { Tabs } from "@kobalte/core/tabs";
import type { TabsRootProps } from "@kobalte/core/tabs";

import { bem } from "@/shared";

import css from "./tabs-root.module.scss";

const { cls } = bem(css);

export type TabsRootProperties = {
	children?: JSX.Element | JSX.Element[];
	class?: string;
} & TabsRootProps;

export const TabsRoot: Component<TabsRootProperties> = (properties) => {
	let [local, others] = splitProps(properties, ["class"]);

	return <Tabs class={cls.tabsRoot.block(null, local.class)} {...others} />;
};
