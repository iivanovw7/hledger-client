import { AppearanceSettings } from "@/entities/appearance";
import { PageLayout } from "@/shared";
import { Header } from "@/widgets";

export const Settings = () => (
	<PageLayout>
		<Header title="Settings" />
		<AppearanceSettings />
	</PageLayout>
);
