import type { Theme } from "#/styles";

import { SettingsGroup } from "@/entities/settings";
import { bem, capitalize, Checkbox, Select, settingsStore } from "@/shared";

import css from "./appearance-settings.module.scss";

const { cls } = bem(css);

export const AppearanceSettings = () => {
	return (
		<SettingsGroup title="Appearance">
			<div class={cls.appearanceSettings.block()}>
				<div class={cls.appearanceSettings.section()}>
					<h5>Color theme</h5>
					<Select<Theme>
						class={cls.appearanceSettings.select()}
						color="primary"
						onChange={(value) => {
							settingsStore.actions.setTheme(value || "dark");
						}}
						options={["dark", "light"]}
						renderValue={(state) => capitalize(state.selectedOption())}
						value={settingsStore.state.theme}
					/>
				</div>
				<div class={cls.appearanceSettings.section()}>
					<Checkbox
						checked={settingsStore.state.transactionsHighlight}
						class={cls.appearanceSettings.checkbox()}
						color="primary"
						description="By account name prefix."
						label="Transaction highlighting"
						labelContainerClass={cls.appearanceSettings.checkboxLabelContainer()}
						onChange={(checked) => settingsStore.actions.setTransactionsHighlight(checked)}
					/>
				</div>
			</div>
		</SettingsGroup>
	);
};
