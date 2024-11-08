import { createMediaQuery } from "@solid-primitives/media";

import { ErrorScreen } from "@/widgets";

export const withDesktopOverlay = (Cmp: ParentComponent): Component => {
	return (properties) => (
		<>
			<Cmp {...properties} />
			<Show when={createMediaQuery("(min-width: 768px)")()}>
				<ErrorScreen title="Under construction" />
			</Show>
		</>
	);
};
