import { env, getPlatform } from "../../../utils";

export type OverlayProperties = {
	children?: JSXElement | JSXElement[];
	class?: string;
	lockScroll?: boolean;
	ref?: Accessor<HTMLDivElement | undefined>;
};

const IDENTIFIER = "data-scroll-lock";

export const Overlay = (properties: OverlayProperties) => {
	let scrollbarX = () => {
		return Math.round(env.html.getBoundingClientRect().left) + env.html.scrollLeft;
	};

	createEffect(() => {
		if (!properties.lockScroll) return;

		let alreadyLocked = document.body.hasAttribute(IDENTIFIER);

		if (alreadyLocked) {
			return;
		}

		document.body.setAttribute(IDENTIFIER, "");

		let paddingProperty = scrollbarX() ? "padding-left" : "padding-right";

		let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		if (!/iP(hone|ad|od)|iOS/.test(getPlatform())) {
			Object.assign(document.body.style, {
				overflow: "hidden",
				[paddingProperty]: `${scrollbarWidth}px`,
			});
		}

		let offsetLeft = window.visualViewport?.offsetLeft || 0;
		let offsetTop = window.visualViewport?.offsetTop || 0;
		let { pageXOffset: xOffset, pageYOffset: yOffset } = window;

		Object.assign(document.body.style, {
			left: `${-(xOffset - Math.floor(offsetLeft))}px`,
			overflow: "hidden",
			"padding-prop": `${scrollbarWidth}px`,
			position: "fixed",
			right: "0",
			top: `${-(yOffset - Math.floor(offsetTop))}px`,
		});

		onCleanup(() => {
			if (!/iP(hone|ad|od)|iOS/.test(getPlatform())) {
				document.body.removeAttribute(IDENTIFIER);

				Object.assign(document.body.style, {
					overflow: "",
					[paddingProperty]: "",
				});
			}

			Object.assign(document.body.style, {
				left: "",
				overflow: "",
				"padding-prop": "",
				position: "",
				right: "",
				top: "",
			});

			document.body.removeAttribute(IDENTIFIER);

			window.scrollTo(pageXOffset, pageYOffset);
		});
	});

	return (
		<div
			{...properties}
			style={{
				bottom: 0,
				left: 0,
				overflow: "auto",
				position: "fixed",
				right: 0,
				top: 0,
			}}
		/>
	);
};
