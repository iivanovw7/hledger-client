import { bem, Overlay, Spinner } from "@/shared";

import css from "./wait-screen.module.scss";

const { cls } = bem(css);

export const WaitScreen = () => (
	<Overlay class={cls.waitScreen.overlay()} lockScroll>
		<Spinner containerClass={cls.waitScreen.spinnerContainer()} variant="primary" />
	</Overlay>
);
