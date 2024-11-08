import { bem, callHandler } from "@/shared";

import type { PlainButtonProperties } from "../button";

import { PlaintButton } from "../button";
import { useCollapsibleContext } from "./collapsible-context";

import css from "./collapsible-trigger.module.scss";

const { cls } = bem(css);

export type CollapsibleTriggerProperties = {
	"aria-controls"?: string | undefined;
	"aria-expanded"?: boolean;
	children: JSX.Element;
	class?: string;
	onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
	ref?: ((element: HTMLButtonElement) => void) | HTMLButtonElement;
	style?: JSX.CSSProperties;
} & PlainButtonProperties;

export const CollapsibleTrigger = (properties: CollapsibleTriggerProperties) => {
	let context = useCollapsibleContext();

	let [local, others] = splitProps(properties, [
		"style",
		"class",
		"onClick",
		"disabled",
		"aria-controls",
		"aria-expanded",
	]);

	let onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (eventData) => {
		callHandler(eventData, local.onClick);
		context.toggle();
	};

	return (
		<PlaintButton
			aria-expanded={context.isOpen()}
			class={cls.collapsibleTrigger.block(null, local.class)}
			style={local.style}
			{...(context.isOpen() && {
				"aria-controls": context.contentId(),
			})}
			disabled={context.disabled()}
			onClick={onClick}
			{...context.dataset()}
			{...others}
		/>
	);
};
