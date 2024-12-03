import { settingsStore } from "@/shared";
import { WaitScreen } from "@/widgets";

export const withWaitScreen = (Cmp: ParentComponent): Component => {
	return (properties) => (
		<>
			<Cmp {...properties} />
			<Show when={settingsStore.state.waitQueue > 0}>
				<WaitScreen />
			</Show>
		</>
	);
};
