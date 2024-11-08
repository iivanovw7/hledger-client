import { DateTime } from "luxon";

import { compose } from "ramda";

import { useAccountsStore, useTransactionsStore, withAccountsStore, withTransactionsStore } from "@/entities";
import { settingsStore } from "@/shared";

const withLocalStores = compose(withAccountsStore, withTransactionsStore);

export const withInitialState = (Cmp: ParentComponent): Component => {
	return withLocalStores((properties) => {
		let { actions: accountsActions } = useAccountsStore();
		let { actions: transactionsActions } = useTransactionsStore();

		createEffect(async () => {
			await accountsActions.loadAccountNames();
			await accountsActions.loadAccounts();
			await transactionsActions.loadTransactions();

			settingsStore.actions.setUpdatedLast(DateTime.now());
		});

		return <Cmp {...properties} />;
	});
};
