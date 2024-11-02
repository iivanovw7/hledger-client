/**
 *	Module contains axios client transformers.
 */
import type { RequestOptions } from "#/http";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export type CreateAxiosOptions = {
	requestOptions?: RequestOptions;
	transform?: AxiosTransform;
} & AxiosRequestConfig;

/* eslint-disable @typescript-eslint/no-explicit-any */

export abstract class AxiosTransform {
	public beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

	public requestCatchHook?: (errorData: AxiosError, options: RequestOptions) => Promise<any>;

	public requestInterceptors?: (
		config: InternalAxiosRequestConfig,
		options: CreateAxiosOptions,
	) => InternalAxiosRequestConfig;

	public requestInterceptorsCatch?: (error: AxiosError) => void;

	public responseInterceptors?: (response: AxiosResponse<any>) => AxiosResponse<any>;

	public responseInterceptorsCatch?: (axiosInstance: AxiosInstance, error: AxiosError) => any;

	public transformResponseHook?: (response: AxiosResponse<any>, options: RequestOptions) => any;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
