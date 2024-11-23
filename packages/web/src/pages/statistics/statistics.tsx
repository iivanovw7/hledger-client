import { useTransactionsStore } from "@/entities";
import { StatisticsPreview } from "@/features";
import { PageLayout } from "@/shared";
import { Header, HeaderLoader } from "@/widgets";

export const Statistics = () => {
	let { state } = useTransactionsStore();

	return (
		<PageLayout>
			<Header title="Statistics" />
			<HeaderLoader subtitle={`${state.transactionsCount} transactions in total`} />
			<StatisticsPreview />
		</PageLayout>
	);
};
