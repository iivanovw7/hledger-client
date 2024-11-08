import { bem, settingsStore } from "@/shared";

import css from "./header-loader.module.scss";

const { cls } = bem(css);

export type HeaderLoaderProperties = {
	subtitle?: string;
};

export const HeaderLoader = (properties: HeaderLoaderProperties) => {
	return (
		<div class={cls.headerLoader.block()}>
			{settingsStore.state.updatedLast && (
				<span>
					<span class={cls.headerLoader.text()}>Last updated: </span>
					<span class={cls.headerLoader.textDate()}>
						{settingsStore.state.updatedLast.toFormat("MM/dd/yyyy hh:mm:ss a")}
					</span>
				</span>
			)}
			{properties.subtitle && <span class={cls.headerLoader.subtitle()}>{properties.subtitle}</span>}
		</div>
	);
};
