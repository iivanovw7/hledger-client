import { bem } from "@/shared";

import css from "./settings-group.module.scss";

const { cls } = bem(css);

export type SettingsGroupProperties = {
	children?: JSX.Element | JSX.Element[];
	title: string;
};

export const SettingsGroup: Component<SettingsGroupProperties> = (properties) => {
	let { children, title } = properties;

	return (
		<div class={cls.settingsGroup.block()}>
			<h3 class={cls.settingsGroup.title()}>{title}</h3>
			<div class={cls.settingsGroup.divider()} />
			<div class={cls.settingsGroup.card()}>{children}</div>
		</div>
	);
};
