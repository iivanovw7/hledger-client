/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *	Module contains axios client class.
 *		@module src/shared/utils/axios/Axios
 */

import type { RequestOptions } from "#/http";
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import axios from "axios";
import { clone } from "ramda";

import type { CreateAxiosOptions } from "./transform";

import { RequestMethod } from "../http";
import { isFunction } from "../lang";

export * from "./transform";

export class AxiosClient {
	private axiosInstance: AxiosInstance;

	private readonly options: CreateAxiosOptions;

	constructor(options: CreateAxiosOptions) {
		this.options = options;
		this.axiosInstance = axios.create(options);
		this.setupInterceptors();
	}

	private createAxios(config: CreateAxiosOptions): void {
		this.axiosInstance = axios.create(config);
	}

	private getTransform() {
		return this.options.transform;
	}

	private setupInterceptors() {
		let {
			axiosInstance,
			options: { transform },
		} = this;

		if (transform) {
			let { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } =
				transform;

			this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
				// If cancel repeat request is turned on, then cancel repeat request is prohibited
				if (requestInterceptors && isFunction(requestInterceptors)) {
					config = requestInterceptors(config, this.options);
				}

				return config;
			}, undefined);

			if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
				this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);
			}

			if (responseInterceptorsCatch && isFunction(responseInterceptorsCatch)) {
				this.axiosInstance.interceptors.response.use(undefined, (error) => {
					return responseInterceptorsCatch(axiosInstance, error);
				});
			}

			this.axiosInstance.interceptors.response.use((response: AxiosResponse<any>) => {
				if (responseInterceptors && isFunction(responseInterceptors)) {
					response = responseInterceptors(response);
				}

				return response;
			}, undefined);
		}
	}

	/**
	 * Reconfigure axios.
	 * @param config - config instance.
	 */
	public configAxios(config: CreateAxiosOptions) {
		this.createAxios(config);
	}

	public delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: RequestMethod.DELETE }, options);
	}

	public get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: RequestMethod.GET }, options);
	}

	public getAxios(): AxiosInstance {
		return this.axiosInstance;
	}

	public post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: RequestMethod.POST }, options);
	}

	public put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: RequestMethod.PUT }, options);
	}

	public request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		let config_: CreateAxiosOptions = clone(config);

		if (config.cancelToken) {
			config_.cancelToken = config.cancelToken;
		}

		let transform = this.getTransform();

		let { requestOptions } = this.options;
		let { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};

		let opt: RequestOptions = {
			...requestOptions,
			...options,
		};

		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			config_ = beforeRequestHook(config_, opt);
		}

		config_.requestOptions = { ...requestOptions, ...options };

		return new Promise((resolve, reject) => {
			this.axiosInstance
				.request<any, AxiosResponse<any>>(config_)
				.then((response: AxiosResponse<any>) => {
					if (transformResponseHook && isFunction(transformResponseHook)) {
						try {
							resolve(transformResponseHook(response, opt));
						} catch (error) {
							// eslint-disable-next-line promise/no-multiple-resolved
							reject(error || new Error("Request error!"));
						}
					} else {
						resolve(response as unknown as Promise<T>);
					}
				})
				.catch((error: AxiosError | Error) => {
					if (requestCatchHook && isFunction(requestCatchHook)) {
						reject(requestCatchHook(error as AxiosError, opt));
					} else {
						if (axios.isAxiosError(error)) {
							// rewrite error message from axios in here
						}

						reject(error);
					}
				});
		});
	}

	public setHeader(headers: any): void {
		Object.assign(this.axiosInstance.defaults.headers, headers);
	}
}
