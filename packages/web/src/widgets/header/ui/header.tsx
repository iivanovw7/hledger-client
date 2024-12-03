import { bem, Icon } from "@/shared";

import css from "./header.module.scss";

const { cls } = bem(css);

export type HeaderProperties = {
	actions?: JSXElement;
	actionsClass?: string;
	children?: string;
	class?: string;
	containerClass?: string;
	title?: string;
	titleClass?: string;
};

export const Header: Component<HeaderProperties> = (properties) => (
	<header class={cls.header.block(null, properties.class)}>
		<div class={cls.header.container(null, properties.containerClass)}>
			<div class={cls.header.titleContainer()}>
				<Icon name="hledger" size="medium" />
				<h1 class={cls.header.title(null, properties.title)}>{properties.title}</h1>
			</div>
			<div class={cls.header.actions(null, properties.actions)}>{properties.actions}</div>
		</div>
		{properties.children}
	</header>
);
