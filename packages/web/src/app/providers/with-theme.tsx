import { env, settingsStore } from "@/shared";

export const withTheme = (Cmp: ParentComponent): Component => {
	return (properties) => {
		let document = env.defaultDocument;

		onMount(() => {
			if (document) {
				document.documentElement.setAttribute("data-theme", settingsStore.state.theme);
			}
		});

		return <Cmp {...properties} />;
	};
};
