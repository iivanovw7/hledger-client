import { bem } from "@/shared";

import { Overlay } from "../overlay";
import { Spinner } from "../spinner";

import css from "./wait-screen.module.scss";

const { cls } = bem(css);

export const WaitScreen = () => (
	<Overlay class={cls.waitScreen.overlay()} lockScroll>
		<Spinner containerClass={cls.waitScreen.spinnerContainer()} variant="primary" />
	</Overlay>
);
