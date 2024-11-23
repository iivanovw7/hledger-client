export type AnyStore = { actions: object; state: object };

export type PrimitiveType = boolean | Date | null | number | string | undefined;

export type MessageValues = Record<string, FormatXMLElementFn<string, string> | PrimitiveType>;

export type FormatXMLElementFunction<T, R = (string | T)[] | string | T> = (parts: (string | T)[]) => R;

export type FieldValidationResult = {
	messageDescriptor: ErrorMessage;
	values?: MessageValues;
};

export type LoadingType = "progress" | "wait";

export type LoadingParameters = {
	loader?: LoadingType | null;
};
