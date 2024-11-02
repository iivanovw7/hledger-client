import { bem, menuItems } from "@/shared";

import { NavLink } from "./nav-link";

import css from "./nav-bar.module.scss";

const { cls } = bem(css);

export const NavBar: Component = (properties) => (
	<nav class={cls.navBar.block()} {...properties}>
		<For each={menuItems}>
			{(item) => (
				<div class={cls.navBar.element()}>
					<NavLink disabled={item.disabled} href={item.to} icon={item.icon} text={item.text} />
				</div>
			)}
		</For>
	</nav>
);
