import type { IconName, IconProperties } from "@/shared";

import { bem, Icon, mergeDefaultProperties } from "@/shared";

import type { PlainButtonProperties } from "./plain-button";

import { PlainButton } from "./plain-button";

import css from "./button.module.scss";

const { cls } = bem(css);

export type ButtonProperties = {
	children?: JSXElement;
	class?: string;
	/** @default "primary" */
	color?: "danger" | "primary" | "secondary";
	/** @default "full" */
	fill?: "full" | "none" | "outline";
	fullWidth?: boolean;
	icon?: IconName;
	iconClass?: string;
	iconPosition?: "center" | "end" | "start";
	iconSize?: IconProperties["size"];
	isLoading?: boolean;
	loaderClass?: string;
	text?: JSXElement;
	textAlign?: "center" | "end" | "start";
	textClass?: string;
} & PlainButtonProperties;

export const Button: Component<ButtonProperties> = (properties) => {
	let mergedProperties = mergeDefaultProperties(
		{ color: "primary", fill: "full", iconPosition: "center", iconSize: "small", textAlign: "start" },
		properties,
	);

	let [local, others] = splitProps(mergedProperties, [
		"text",
		"textClass",
		"textAlign",
		"icon",
		"iconClass",
		"iconSize",
		"iconPosition",
		"children",
		"isLoading",
		"loaderClass",
		"fill",
		"fullWidth",
		"class",
		"color",
	]);

	let hasText = () => local.text !== undefined && local.text !== null;

	let iconElement = () => {
		return (
			local.icon && (
				<Icon
					class={cls.button.icon(
						{
							alignCenter: local.iconPosition === "center",
							alignEnd: local.iconPosition === "end",
							alignStart: local.iconPosition === "start",
						},
						local.iconClass,
					)}
					name={local.icon}
					size={local.iconSize}
				/>
			)
		);
	};

	let buttonTheme = cls.buttonTheme.block({
		colorDanger: local.color === "danger",
		colorSecondary: local.color === "secondary",
		fillNone: local.fill === "none",
		fillOutlined: local.fill === "outline",
	});

	return (
		<PlainButton
			class={cls.button.block(
				{
					fullWidth: local.fullWidth,
					iconOnly: !!iconElement() && !hasText,
				},
				buttonTheme,
				local.class,
			)}
			{...others}>
			{local.text !== undefined && local.text !== null && (
				<Show fallback={<span class={cls.button.loader(null, local.loaderClass)} />} when={!local.isLoading}>
					{local.children}
					<div
						class={cls.button.text(
							{
								alignCenter: local.textAlign === "center",
								alignEnd: local.textAlign === "end",
								alignStart: local.textAlign === "start",
							},
							local.textClass,
						)}>
						{local.text}
					</div>
				</Show>
			)}
			{iconElement()}
		</PlainButton>
	);
};
