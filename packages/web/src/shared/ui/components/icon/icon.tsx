import { splitProps } from "solid-js";

import type { Size } from "#/styles";

import { bem, findOr, mergeDefaultProperties } from "@/shared";
import icons from "virtual:svg-icons-names";

import type { IconName } from "./icon.type";

import css from "./icon.module.scss";

const { cls } = bem(css);

export type IconProperties = {
	class?: string;
	containerClass?: string;
	containerRef?: Accessor<Element | undefined>;
	name: IconName;
	ref?: Accessor<SVGImageElement | undefined>;
	rounded?: boolean;
	size?: Size;
};

const PREFIX: Readonly<string> = "icon";

const getIcon = (id?: string): string => {
	return findOr(`${PREFIX}-no-icon`, (value) => value === `${PREFIX}-${id}`, icons);
};

export const Icon: Component<IconProperties> = (properties) => {
	let mergedProperties = mergeDefaultProperties({ size: "medium" }, properties);

	let [local, rest] = splitProps(mergedProperties, [
		"name",
		"containerClass",
		"class",
		"ref",
		"containerRef",
		"size",
		"rounded",
	]);

	let sizes = {
		sizeLarge: local.size === "large",
		sizeMedium: local.size === "medium",
		sizeSmall: local.size === "small",
		sizeXSmall: local.size === "x-small",
	};

	return (
		<div class={cls.iconBox.block(sizes, local.containerClass)} ref={local.containerRef}>
			<svg aria-hidden="true" class={cls.icon.block(sizes, local.class)} ref={local.ref}>
				<use href={`#${getIcon(local.name)}`} {...rest} />
			</svg>
		</div>
	);
};
