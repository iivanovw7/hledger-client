import { mergeRefs } from "@solid-primitives/refs";
import createPresence from "solid-presence";

import { bem, mergeDefaultProperties } from "@/shared";

import type { CollapsibleDataSet } from "./collapsible-context";

import { useCollapsibleContext } from "./collapsible-context";

import css from "./collapsible-content.module.scss";

const { cls } = bem(css);

export type CollapsibleContentProperties = {
	children: JSX.Element | JSX.Element[];
	class?: string;
	id?: string;
	ref?: ((element: HTMLElement) => void) | HTMLElement;
	style?: JSX.CSSProperties;
} & Partial<CollapsibleDataSet>;

export const CollapsibleContent = (properties: CollapsibleContentProperties) => {
	let [reference, setReference] = createSignal<HTMLElement>();

	let context = useCollapsibleContext();
	let mergedProperties = mergeDefaultProperties({ id: context.generateId("content") }, properties);

	let [local, others] = splitProps(mergedProperties, ["ref", "class", "id", "style"]);

	let { present } = createPresence({
		element: () => reference() ?? null,
		show: context.shouldMount,
	});

	let [height, setHeight] = createSignal(0);
	let [width, setWidth] = createSignal(0);

	let isOpen = () => context.isOpen() || present();
	let isMountAnimationPrevented = isOpen();

	onMount(() => {
		let raf = requestAnimationFrame(() => {
			isMountAnimationPrevented = false;
		});

		onCleanup(() => {
			cancelAnimationFrame(raf);
		});
	});

	createEffect(
		on(present, () => {
			if (!reference()) {
				return;
			}

			reference()!.style.transitionDuration = "0s";
			reference()!.style.animationName = "none";

			let rect = reference()!.getBoundingClientRect();

			setHeight(rect.height);
			setWidth(rect.width);

			if (!isMountAnimationPrevented) {
				reference()!.style.transitionDuration = "";
				reference()!.style.animationName = "";
			}
		}),
	);

	createEffect(
		on(
			context.isOpen,
			(open) => {
				if (!open && reference()) {
					reference()!.style.transitionDuration = "";
					reference()!.style.animationName = "";
				}
			},
			{ defer: true },
		),
	);

	createEffect(() => onCleanup(context.registerContentId(local.id)));

	return (
		<Show when={present()}>
			<div
				class={cls.collapsibleContent.block(null, local.class)}
				id={local.id}
				ref={mergeRefs(setReference, local.ref)}
				style={{
					"--collapsible-content-height": height() ? `${height()}px` : undefined,
					"--collapsible-content-width": width() ? `${width()}px` : undefined,
					...local.style,
				}}
				{...context.dataset()}
				{...others}
			/>
		</Show>
	);
};
