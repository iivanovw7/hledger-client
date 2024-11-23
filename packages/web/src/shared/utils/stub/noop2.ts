import type { AnyFunction } from "#/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const noop2: (...arguments_: any[]) => AnyFunction = () => () => {};
