import type { AsyncReturnType, Maybe, Voidable } from "#/utils";
import type { ZodError } from "zod";

import { getLogger } from "../log";
import { isValidationError } from "./validate";

type SetLoading = (isLoading: boolean) => void;

export type MakeApiRequestParameters<Request_ extends () => Promise<unknown>> = {
	ignoreErrors?: unknown[];
	onRequestError?: (error: unknown) => void;
	onValidationError?: (error: ZodError) => void;
	request: Request_;
	setLoading?: SetLoading;
};

const logger = getLogger("Request");

export const makeApiRequest = async <Request_ extends () => Promise<unknown>, Response_ = AsyncReturnType<Request_>>(
	parameters: MakeApiRequestParameters<Request_>,
	// eslint-disable-next-line consistent-return
): Promise<Voidable<Response_ extends Maybe<void> ? true : Response_>> => {
	let { onRequestError, onValidationError, request, setLoading } = parameters;

	try {
		setLoading?.(true);

		let result = await request();

		return await ((result ?? true) as unknown as Promise<
			Voidable<Response_ extends Maybe<void> ? true : Response_>
		>);
	} catch (error: unknown) {
		if (isValidationError(error)) {
			logger.error("[ZodError]:", error.message, error.errors);
			onValidationError?.(error);
		} else if (onRequestError) {
			onRequestError(error);
		} else {
			logger.error(error);
		}
	} finally {
		setLoading?.(false);
	}
};
