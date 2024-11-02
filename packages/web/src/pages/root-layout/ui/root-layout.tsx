import { bem } from "@/shared";
import { NavBar } from "@/widgets";

import css from "./root-layout.module.scss";

const { cls } = bem(css);

export type RootLayoutProperties = {
	children?: JSXElement;
	class?: string;
};

export const RootLayout: Component<RootLayoutProperties> = (properties) => (
	<div class={cls.rootLayout.block(null, properties.class)}>
		{properties.children}
		<NavBar />
	</div>
);

export const withRootLayout = (Cmp: ParentComponent): Component => {
	return (properties) => (
		<RootLayout>
			<Cmp {...properties} />
		</RootLayout>
	);
};
