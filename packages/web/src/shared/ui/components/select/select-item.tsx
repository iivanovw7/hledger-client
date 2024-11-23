import type { SelectItemProps } from "@kobalte/core/select";

import { bem, Icon } from "@/shared";
import { Select as SelectRoot } from "@kobalte/core/select";

import css from "./select-item.module.scss";

const { cls } = bem(css);

export type SelectItemProperties = SelectItemProps;

export const SelectItem: Component<SelectItemProperties> = (properties) => (
	<SelectRoot.Item class={cls.select.item()} item={properties.item}>
		<SelectRoot.ItemLabel>{properties.item.rawValue}</SelectRoot.ItemLabel>
		<SelectRoot.ItemIndicator class={cls.select.itemIndicator()}>
			<Icon name="check" size="x-small" />
		</SelectRoot.ItemIndicator>
	</SelectRoot.Item>
);
