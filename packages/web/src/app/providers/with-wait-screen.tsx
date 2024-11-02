import { settingsStore, WaitScreen } from "@/shared";

export const withWaitScreen = (Cmp: ParentComponent): Component => {
	return (properties) => (
		<>
			<Cmp {...properties} />
			<Show when={settingsStore.state.waitQueue}>
				<WaitScreen />
			</Show>
		</>
	);
};
