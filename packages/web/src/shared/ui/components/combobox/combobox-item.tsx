import type { ComboboxItemProps } from "@kobalte/core/combobox";
import { Combobox as ComboboxRoot } from "@kobalte/core/combobox";

import { bem, Icon } from "@/shared";

import css from "./combobox-item.module.scss";

const { cls } = bem(css);

export type ComboboxItemProperties = ComboboxItemProps;

export const ComboboxItem: Component<ComboboxItemProperties> = (properties) => (
	<ComboboxRoot.Item class={cls.combobox.item()} item={properties.item}>
		<ComboboxRoot.ItemLabel>{properties.item.rawValue}</ComboboxRoot.ItemLabel>
		<ComboboxRoot.ItemIndicator class={cls.combobox.indicator()}>
			<Icon name="check" size="x-small" />
		</ComboboxRoot.ItemIndicator>
	</ComboboxRoot.Item>
);
