import type { AccountNameListResponse, AccountsResponse, TransactionsResponse } from "#/api";
import type { AxiosRequestConfig } from "axios";

import { http } from "./hledger-web.client";

export const hledgerWebApi = {
	getAccountNames: async (config: AxiosRequestConfig = {}) => {
		return http.get<AccountNameListResponse>({
			url: "/accountnames",
			...config,
		});
	},
	getAccounts: async (config: AxiosRequestConfig = {}) => {
		return http.get<AccountsResponse>({
			url: "/accounts",
			...config,
		});
	},
	getTransactions: async (config: AxiosRequestConfig = {}) => {
		return http.get<TransactionsResponse>({
			url: "/transactions",
			...config,
		});
	},
};
