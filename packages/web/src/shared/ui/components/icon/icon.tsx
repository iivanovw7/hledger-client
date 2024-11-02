import { splitProps } from "solid-js";

import type { Size } from "#/styles";

import { bem, findOr } from "@/shared";
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

const getIcon = (id: string): string => {
	return findOr(`${PREFIX}-no-icon`, (value) => value === `${PREFIX}-${id}`, icons);
};

export const Icon: Component<IconProperties> = (properties) => {
	let [local, rest] = splitProps(properties, [
		"name",
		"containerClass",
		"class",
		"ref",
		"containerRef",
		"size",
		"rounded",
	]);

	let size = local.size || "medium";
	let sizes = {
		sizeLarge: size === "large",
		sizeMedium: size === "medium",
		sizeSmall: size === "small",
	};

	return (
		<div class={cls.iconBox.block(sizes, local.containerClass)} ref={local.containerRef}>
			<svg aria-hidden="true" class={cls.icon.block(sizes, local.class)} ref={local.ref}>
				<use href={`#${getIcon(local.name)}`} {...rest} />
			</svg>
		</div>
	);
};
