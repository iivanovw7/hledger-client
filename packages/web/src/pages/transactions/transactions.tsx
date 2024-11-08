import { TransactionsGroupList, useTransactionsStore } from "@/entities";
import { PageLayout } from "@/shared";
import { Header, HeaderLoader } from "@/widgets";

export const Transactions = () => {
	let { state } = useTransactionsStore();

	return (
		<PageLayout>
			<Header title="Transactions" />
			<HeaderLoader subtitle={`${state.transactionsCount} transactions in total`} />
			<TransactionsGroupList groups={state.transactionsGroups} />
		</PageLayout>
	);
};
