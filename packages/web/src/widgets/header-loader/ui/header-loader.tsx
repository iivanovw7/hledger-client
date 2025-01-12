import { DateTime } from "luxon";

import type { LoadingParameters } from "#/common";

import { useAccountsStore, useTransactionsStore } from "@/entities";
import { bem, Button, settingsStore } from "@/shared";

import css from "./header-loader.module.scss";

const { cls } = bem(css);

const loadingParameters: LoadingParameters = {
	loader: "progress",
};

export type HeaderLoaderProperties = {
	children?: JSX.Element | JSX.Element[];
	gutterBottom?: boolean;
	subtitle?: string;
};

export const HeaderLoader = (properties: HeaderLoaderProperties) => {
	let { actions: accountsActions } = useAccountsStore();
	let { actions: transactionsActions } = useTransactionsStore();

	let handleClick = async () => {
		await accountsActions.loadAccountNames(loadingParameters);
		await accountsActions.loadAccounts(loadingParameters);
		await transactionsActions.loadTransactions(loadingParameters);

		settingsStore.actions.setUpdatedLast(DateTime.now());
	};

	return (
		<div class={cls.headerLoader.block({ gutterBottom: properties.gutterBottom })}>
			<div class={cls.headerLoader.header()}>
				<div class={cls.headerLoader.content()}>
					{settingsStore.state.updatedLast && (
						<span>
							<span class={cls.headerLoader.text()}>Last updated: </span>
							<span class={cls.headerLoader.textDate()}>
								{settingsStore.state.updatedLast.toFormat("MM/dd/yyyy hh:mm:ss a")}
							</span>
						</span>
					)}
					{properties.subtitle && <span class={cls.headerLoader.subtitle()}>{properties.subtitle}</span>}
				</div>
				<div class={cls.headerLoader.controls()}>
					<Button
						color="primary"
						disabled={settingsStore.state.progressQueue > 0}
						fill="none"
						icon="refresh-cw"
						onClick={handleClick}
					/>
				</div>
			</div>
			{properties.children}
		</div>
	);
};
