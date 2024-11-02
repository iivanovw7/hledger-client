import type { AccountNameListResponse } from "#/api";
import type { AxiosRequestConfig } from "axios";

import { http } from "./hledger-web.client";

export const hledgerWebApi = {
	getAccountNames: async (config: AxiosRequestConfig = {}) => {
		return http.get<AccountNameListResponse>({
			url: "/api/accountnames",
			...config,
		});
	},
};
