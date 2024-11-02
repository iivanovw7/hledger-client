import { ErrorScreen, useMediaQuery } from "@/shared";

export const withDesktopOverlay = (Cmp: ParentComponent): Component => {
	let isDesktop = useMediaQuery("(min-width: 768px)");

	return (properties) => (
		<>
			<Cmp {...properties} />
			<Show when={isDesktop()}>
				<ErrorScreen title="Under construction" />
			</Show>
		</>
	);
};
