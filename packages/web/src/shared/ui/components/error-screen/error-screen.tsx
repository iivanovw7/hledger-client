import { bem } from "@/shared";

import { Overlay } from "../overlay";

import css from "./error-screen.module.scss";

const { cls } = bem(css);

export type ErrorScreenProperites = {
	class?: string;
	overlayClass?: string;
	subtitle?: string;
	title?: string;
};

export const ErrorScreen = (properties: ErrorScreenProperites) => {
	return (
		<Overlay class={cls.errorScreen.overlay(null, properties.overlayClass)}>
			<div class={cls.errorScreen.block()}>
				<h1 class={cls.errorScreen.title()}>{properties.title}</h1>
			</div>
		</Overlay>
	);
};
