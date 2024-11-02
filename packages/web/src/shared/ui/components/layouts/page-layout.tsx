import { bem } from "@/shared";

import css from "./page-layout.module.scss";

const { cls } = bem(css);

export type PageLayoutProperties = {
	children?: JSXElement;
	class?: string;
	hasBottomPadding?: boolean;
	ref?: Accessor<HTMLAnchorElement | undefined>;
};

export const PageLayout: Component<PageLayoutProperties> = (properties) => (
	<div class={cls.pageLayout.block({ hasBottomPadding: properties.hasBottomPadding })}>{properties.children}</div>
);
