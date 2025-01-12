import { env, settingsStore, storage } from "@/shared";

export const withTheme = (Cmp: ParentComponent): Component => {
	return (properties) => {
		let document = env.defaultDocument;

		createEffect(() => {
			if (document) {
				document.documentElement.setAttribute("data-theme", settingsStore.state.theme);
				storage.setTheme(settingsStore.state.theme);
			}
		});

		return <Cmp {...properties} />;
	};
};
