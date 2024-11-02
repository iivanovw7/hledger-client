import { useAccountsStore } from "@/entities";

export const withInitialState = (Cmp: ParentComponent): Component => {
	return (properties) => {
		let { actions: accountActions } = useAccountsStore();

		createEffect(async () => {
			await accountActions.loadAccountNames();
		});

		return <Cmp {...properties} />;
	};
};
