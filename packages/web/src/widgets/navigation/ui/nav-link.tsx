import type { IconName } from "@/shared/ui";

import { bem, Icon } from "@/shared";
import { A, useMatch } from "@solidjs/router";

import css from "./nav-link.module.scss";

const { cls } = bem(css);

export type NavLinkProperties = {
	class?: string;
	disabled?: boolean;
	href: string;
	icon?: IconName;
	ref?: Accessor<HTMLAnchorElement | undefined>;
	replace?: boolean;
	style?: JSX.CSSProperties;
	text: string;
	textClass?: string;
};

export const NavLink = (properties: NavLinkProperties) => {
	let match = (path: string) => useMatch(() => path)();

	return (
		<Show fallback={<NavLink.DisabledLink {...properties} />} when={!properties.disabled}>
			<A
				aria-description={properties.text}
				class={cls.navLink.block(null, properties.class)}
				{...(properties.disabled && {
					"data-disabled": "",
				})}
				{...(!!match(properties.href) && {
					"data-active": "",
					tabindex: -1,
				})}
				href={properties.href}
				ref={properties.ref}
				style={properties.style}>
				{properties.icon && (
					<Icon
						containerClass={cls.navLink.iconBox()}
						name={properties.icon}
						rounded={!!match(properties.href)}
						size="medium"
					/>
				)}
				<span class={cls.navLink.text(null, properties.textClass)}>{properties.text}</span>
			</A>
		</Show>
	);
};

NavLink.DisabledLink = (properties: NavLinkProperties) => (
	<div
		class={cls.navLink.block(null, properties.class)}
		data-active={false}
		data-disabled={properties.disabled}
		style={properties.style}>
		{properties.icon && <Icon containerClass={cls.navLink.iconBox()} name={properties.icon} size="medium" />}
		<span class={cls.navLink.text(null, properties.textClass)}>{properties.text}</span>
	</div>
);
