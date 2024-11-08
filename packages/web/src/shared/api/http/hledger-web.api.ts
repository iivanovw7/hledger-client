import type { AccountNameListResponse, AccountsResponse, TransactionsResponse } from "#/api";
import type { AxiosRequestConfig } from "axios";

import { http } from "./hledger-web.client";

export const hledgerWebApi = {
	getAccountNames: async (config: AxiosRequestConfig = {}) => {
		return http.get<AccountNameListResponse>({
			url: "/api/accountnames",
			...config,
		});
	},
	getAccounts: async (config: AxiosRequestConfig = {}) => {
		return http.get<AccountsResponse>({
			url: "/api/accounts",
			...config,
		});
	},
	getTransactions: async (config: AxiosRequestConfig = {}) => {
		return http.get<TransactionsResponse>({
			url: "/api/transactions",
			...config,
		});
	},
};
