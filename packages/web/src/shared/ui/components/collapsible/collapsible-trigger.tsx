import type { CollapsibleTriggerProps } from "@kobalte/core/collapsible";
import { Trigger } from "@kobalte/core/collapsible";

import { bem } from "@/shared";

import css from "./collapsible-trigger.module.scss";

const { cls } = bem(css);

export type CollapsibleTriggerProperties = {
	children: JSX.Element | JSX.Element[];
	class?: string;
} & CollapsibleTriggerProps;

export const CollapsibleTrigger: Component<CollapsibleTriggerProperties> = (properties) => {
	let [local, others] = splitProps(properties, ["class"]);

	return <Trigger class={cls.collapsibleTrigger.block(null, local.class)} {...others} />;
};
