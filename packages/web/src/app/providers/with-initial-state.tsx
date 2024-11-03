import { useAccountsStore, withAccountsStore } from "@/entities";

export const withInitialState = (Cmp: ParentComponent): Component => {
	return withAccountsStore((properties) => {
		let { actions: accountActions } = useAccountsStore();

		createEffect(async () => {
			await accountActions.loadAccountNames();
		});

		return <Cmp {...properties} />;
	});
};
