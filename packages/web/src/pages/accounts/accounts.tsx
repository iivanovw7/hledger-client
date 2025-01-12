import { AccountCardList, useAccountsStore } from "@/entities";
import { PageLayout } from "@/shared";
import { Header, HeaderLoader } from "@/widgets";

export const Accounts = () => {
	let { state } = useAccountsStore();

	return (
		<PageLayout>
			<Header title="Accounts" />
			<HeaderLoader gutterBottom subtitle={`${state.accountsCount} accounts in total`} />
			<AccountCardList accounts={state.accountRootItems} />
		</PageLayout>
	);
};
