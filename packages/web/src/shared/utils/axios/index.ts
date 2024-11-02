/**
 *	Module contains axios client.
 *		@module src/shared/utils/axios
 */

import { clone, mergeDeepRight } from "ramda";

import type { AxiosTransform, CreateAxiosOptions } from "./axios";

import { config } from "../../config";
import { ContentType } from "../http";
import { isString } from "../lang";
import { AxiosClient } from "./axios";

const transform: AxiosTransform = {
	beforeRequestHook: (requestConfig, options) => {
		let { apiUrl } = options;

		if (apiUrl && isString(apiUrl)) {
			requestConfig.url = `${apiUrl}${requestConfig.url || ""}`;
		}

		return requestConfig;
	},
};

/**
 *	Create new axios client instance.
 *		@param [opt] - client options.
 *		@returns axis client.
 */
export const createAxios = (opt: Partial<CreateAxiosOptions> = {}) => {
	return new AxiosClient(
		mergeDeepRight(
			{
				headers: {
					"Content-Type": ContentType.JSON,
				},
				timeout: config.net.requestTimeout,
				transform: clone(transform),
			},
			opt,
		) as Partial<CreateAxiosOptions>,
	);
};
