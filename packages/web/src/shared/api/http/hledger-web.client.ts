import type { Recordable } from "#/utils";
import type { AxiosError, AxiosResponse } from "axios";

import { createAxios } from "../../utils";
import { env } from "../../utils/env";

let { password, username } = env.credentials;

const Authorization = `Basic ${btoa(`${username}:${password}`)}`;

export const http = createAxios({
	requestOptions: {},
	transform: {
		requestInterceptors: (config) => {
			if (username && password) {
				(config as Recordable).headers.Authorization = Authorization;
			}

			return config;
		},
		responseInterceptors: <Data>(response: AxiosResponse<Data>): Data => {
			return response.data;
		},
		responseInterceptorsCatch: (_, error: AxiosError) => {
			return Promise.reject(error);
		},
	},
});
