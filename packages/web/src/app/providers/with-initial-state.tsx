import { DateTime } from "luxon";

import { compose } from "ramda";

import type { LoadingParameters } from "#/common";

import { useAccountsStore, useTransactionsStore, withAccountsStore, withTransactionsStore } from "@/entities";
import { useStatisticsStore, withStatisticsStore } from "@/features";
import { settingsStore } from "@/shared";

const withLocalStores = compose(withAccountsStore, withTransactionsStore, withStatisticsStore);

const loadingParameters: LoadingParameters = {
	loader: "wait",
};

export const withInitialState = (Cmp: ParentComponent): Component => {
	return withLocalStores((properties) => {
		let { actions: accountsActions } = useAccountsStore();
		let { actions: transactionsActions, state: transactionsState } = useTransactionsStore();
		let { actions: statisticsActions } = useStatisticsStore();

		createEffect(async () => {
			await accountsActions.loadAccountNames(loadingParameters);
			await accountsActions.loadAccounts(loadingParameters);
			await transactionsActions.loadTransactions(loadingParameters);

			statisticsActions.setChartMonthSetting(transactionsState.transactionsUniqueMonths.at(-1));

			settingsStore.actions.setUpdatedLast(DateTime.now());
		});

		return <Cmp {...properties} />;
	});
};
