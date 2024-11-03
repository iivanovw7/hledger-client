import { ErrorScreen, useMediaQuery } from "@/shared";

export const withDesktopOverlay = (Cmp: ParentComponent): Component => {
	return (properties) => (
		<>
			<Cmp {...properties} />
			<Show when={useMediaQuery("(min-width: 768px)")()}>
				<ErrorScreen title="Under construction" />
			</Show>
		</>
	);
};
