import { TransactionsGroupList, useAccountsStore, useTransactionsStore } from "@/entities";
import { PageLayout } from "@/shared";
import { Header, HeaderLoader } from "@/widgets";

export const Transactions = () => {
	let { state: transactionsState } = useTransactionsStore();
	let { state: accountsState } = useAccountsStore();

	return (
		<PageLayout>
			<Header title="Transactions" />
			<HeaderLoader subtitle={`${transactionsState.transactionsCount} transactions in total`} />
			<TransactionsGroupList
				accountNames={accountsState.accountNames}
				groups={transactionsState.transactionsGroups}
			/>
		</PageLayout>
	);
};
