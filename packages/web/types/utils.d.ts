/* eslint-disable @typescript-eslint/no-explicit-any */

export type RunningMode = "analyze" | "development" | "production" | "test";

export type Pixels = number;

export type Milliseconds = number;

export type Percent = number;

/** Represents type of optional object. */
export type Maybe<T> = null | T | undefined;

/** Represents type of `nullable` object. */
export type Nullable<T> = null | T;

export type ErrorMessage = string;

export type Voidable<T> = T | undefined | void;

export type Recordable<T = any> = Record<string, T>;

export type UnwrapPromise<T extends Promise<any>> = T extends Promise<infer Data> ? Data : never;

/** Represents any function. */
export type AnyFunction = (...arguments_: any[]) => any;

export type AsyncReturnType<T extends (...arguments_: any[]) => Promise<any>> = UnwrapPromise<ReturnType<T>>;

export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = Required<Pick<T, K>> & T;

export type Constructor<T = any> = new (...arguments_: any[]) => T;

export type AugmentedRequired<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** Represents any object object. */
export type AnyObject<T = any> = {
	[field: string]: T;
};

/** Gets property type. */
export type PropertyType<TObject, TProperty extends keyof TObject> = TObject[TProperty];

/** Represents type of object with partial and `nullable` fields. */
export type PartialAndNullable<T> = {
	[P in keyof T]?: null | T[P];
};

export type ObjectOrNull<T = unknown> = Nullable<AnyObject<T>>;

export type OptionalObject<T = unknown> = Maybe<ObjectOrNull<T>>;

/** Object containing promise. */
export type WithPromise<T = unknown> = {
	promise: Promise<T>;
};

export type ValueOf<T> = T[keyof T];

export type ExtractType<T, U extends T> = T extends U ? T : never;

export type ConfigurableWindow = {
	window?: Window;
};

export type ConfigurableDocument = {
	document?: Document;
};

export type ConfigurableNavigator = {
	navigator?: Navigator;
};

export type ConfigurableDocumentOrShadowRoot = {
	document?: DocumentOrShadowRoot;
};

export type ConfigurableLocation = {
	location?: Location;
};

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
