import type { AnyObject, Nullable } from "#/utils";
import type { ZodSchema } from "zod";

import { ZodError } from "zod";

export { z, ZodSchema, ZodTransformer } from "zod";

export let isValidationError = (error: unknown): error is ZodError => {
	return error instanceof ZodError;
};

export let validateField = <Value = unknown, Message = string>(
	value: Value,
	schema: ZodSchema,
	fallback: Message,
): Nullable<Message> => {
	try {
		schema.parse(value);

		return null;
	} catch (error) {
		let issue = error?.issues[0];

		return issue?.message || fallback;
	}
};

export type TValidationSchemaResult<Data = AnyObject, Message = string> = Record<keyof Data, Message>;

export let validateSchema = <Data = AnyObject, Message = string>(
	data: Data,
	schema: ZodSchema,
	fallback: Message,
): TValidationSchemaResult<Data, Message> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let keys = Object.keys(data as any);

	let result: TValidationSchemaResult<Data, Message> = keys.reduce(
		(previous, current) => {
			previous[current] = null;

			return previous;
		},
		{} as TValidationSchemaResult<Data, Message>,
	);

	try {
		schema.parse(data);

		return result;
	} catch (error) {
		for (let issue of error.issues) {
			let key = issue?.path?.[0];

			if (key in result) {
				result[key] = (issue.message as Message) || fallback;
			}
		}

		return result;
	}
};
