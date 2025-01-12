import type { ComboboxRootProps } from "@kobalte/core/combobox";
import { Combobox as ComboboxRoot } from "@kobalte/core/combobox";

import { bem, Button, Icon, mergeDefaultProperties } from "@/shared";

import { ComboboxItem } from "./combobox-item";

import css from "./combobox.module.scss";

const { cls } = bem(css);

export type ComboboxProperties<Option> = {
	class?: string;
	/** @default "primary" */
	color?: "primary" | "secondary";
	isClearable?: boolean;
	onClear?: () => void;
} & ComboboxRootProps<Option>;

export const Combobox = <Option extends string>(properties: ComboboxProperties<Option>) => {
	let mergedProperties = mergeDefaultProperties({ color: "primary", itemComponent: ComboboxItem }, properties);

	let [local, others] = splitProps(mergedProperties as ComboboxProperties<Option>, [
		"color",
		"isClearable",
		"onClear",
	]);

	let colors = {
		colorPrimary: local.color === "primary",
		colorSecondary: local.color === "secondary",
	};

	return (
		<ComboboxRoot {...others}>
			<ComboboxRoot.Control class={cls.combobox.control(colors)}>
				<ComboboxRoot.Input class={cls.combobox.input()} />
				<div class={cls.combobox.controlRighSection()}>
					{local.isClearable && (
						<Button
							class={cls.combobox.clear()}
							color="secondary"
							fill="none"
							icon="x"
							onClick={local.onClear}
						/>
					)}
					<ComboboxRoot.Trigger class={cls.combobox.trigger(colors)}>
						<ComboboxRoot.Icon class={cls.combobox.icon()}>
							<Icon name="chevrons-up-down" size="x-small" />
						</ComboboxRoot.Icon>
					</ComboboxRoot.Trigger>
				</div>
			</ComboboxRoot.Control>
			<ComboboxRoot.Portal>
				<ComboboxRoot.Content class={cls.combobox.content()}>
					<ComboboxRoot.Listbox class={cls.combobox.listbox()} />
				</ComboboxRoot.Content>
			</ComboboxRoot.Portal>
		</ComboboxRoot>
	);
};
