import { Checkbox as CheckboxRoot } from "@kobalte/core/checkbox";
import type { CheckboxRootProps } from "@kobalte/core/checkbox";

import { bem, Icon, mergeDefaultProperties } from "@/shared";

import css from "./checkbox.module.scss";

const { cls } = bem(css);

export type CheckboxProperties = {
	class?: string;
	/** @default "primary" */
	color?: "primary" | "secondary";
	controlClass?: string;
	description?: JSXElement | JSXElement[];
	descriptionClass?: string;
	inputClass?: string;
	label?: JSXElement | JSXElement[];
	labelClass?: string;
	labelContainerClass?: string;
} & CheckboxRootProps;

export const Checkbox = (properties: CheckboxProperties) => {
	let mergedProperties = mergeDefaultProperties({ color: "primary" }, properties);

	let [local, others] = splitProps(mergedProperties, [
		"color",
		"description",
		"descriptionClass",
		"label",
		"class",
		"labelClass",
		"labelContainerClass",
		"inputClass",
		"controlClass",
	]);

	let colors = {
		colorPrimary: local.color === "primary",
		colorSecondary: local.color === "secondary",
	};

	return (
		<CheckboxRoot class={cls.checkbox.block(null, local.class)} {...others}>
			<div class={cls.checkbox.labelContainer(null, local.labelContainerClass)}>
				{local.label && (
					<CheckboxRoot.Label class={cls.checkbox.label(null, local.labelClass)}>
						{local.label}
					</CheckboxRoot.Label>
				)}
				{local.description && (
					<CheckboxRoot.Description as="span" class={cls.checkbox.description(null, local.descriptionClass)}>
						{local.description}
					</CheckboxRoot.Description>
				)}
			</div>
			<CheckboxRoot.Input class={cls.checkbox.input(null, local.inputClass)} />
			<CheckboxRoot.Control class={cls.checkbox.control(colors, local.controlClass)}>
				<CheckboxRoot.Indicator class={cls.checkbox.indicator()}>
					<Icon name="check" size="x-small" />
				</CheckboxRoot.Indicator>
			</CheckboxRoot.Control>
		</CheckboxRoot>
	);
};
