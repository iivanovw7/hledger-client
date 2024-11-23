import { bem, settingsStore } from "@/shared";

import css from "./progress-bar.module.scss";

const { cls } = bem(css);

export const ProgressBar = () => {
	return <div class={cls.progress.block({ isVisible: settingsStore.state.progressQueue })} />;
};
