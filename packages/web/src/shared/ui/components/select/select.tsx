import type { SelectRootProps, SelectValueProps } from "@kobalte/core/select";

import { bem, Icon, mergeDefaultProperties } from "@/shared";
import { Select as SelectRoot } from "@kobalte/core/select";

import { SelectItem } from "./select-item";

import css from "./select.module.scss";

const { cls } = bem(css);

export type SelectProperties<Option> = {
	/** @default "primary" */
	color?: "primary" | "secondary";
	renderValue?: SelectValueProps<Option>["children"];
} & SelectRootProps<Option>;

export const Select = <Option extends string>(properties: SelectProperties<Option>) => {
	let mergedProperties = mergeDefaultProperties(
		{ color: "primary", itemComponent: SelectItem, renderValue: (state) => state.selectedOption() },
		properties,
	);

	let [local, others] = splitProps(mergedProperties as SelectProperties<Option>, ["color", "renderValue"]);

	let colors = {
		colorPrimary: local.color === "primary",
		colorSecondary: local.color === "secondary",
	};

	return (
		<SelectRoot {...others}>
			<SelectRoot.Trigger class={cls.select.trigger(colors)}>
				<SelectRoot.Value<Option> class={cls.select.value()}>{local.renderValue}</SelectRoot.Value>
				<SelectRoot.Icon class={cls.select.icon()}>
					<Icon name="chevrons-up-down" size="x-small" />
				</SelectRoot.Icon>
			</SelectRoot.Trigger>
			<SelectRoot.Portal>
				<SelectRoot.Content class={cls.select.content()}>
					<SelectRoot.Listbox class={cls.select.listbox()} />
				</SelectRoot.Content>
			</SelectRoot.Portal>
		</SelectRoot>
	);
};
