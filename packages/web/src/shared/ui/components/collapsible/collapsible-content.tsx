import type { CollapsibleContentProps } from "@kobalte/core/collapsible";
import { Content } from "@kobalte/core/collapsible";

import { bem } from "@/shared";

import css from "./collapsible-content.module.scss";

const { cls } = bem(css);

export type CollapsibleContentProperties = {
	children?: JSX.Element | JSX.Element[];
	class?: string;
	style?: JSX.CSSProperties;
} & Omit<CollapsibleContentProps, "class">;

export const CollapsibleContent: Component<CollapsibleContentProperties> = (properties) => {
	let [local, others] = splitProps(properties, ["class"]);

	return <Content class={cls.collapsibleContent.block(null, local.class)} {...others} />;
};
