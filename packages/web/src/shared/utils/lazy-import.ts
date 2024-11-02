import type { AnyObject } from "#/utils";

import { isString } from "./lang";

export const lazyImport = <T extends AnyObject, U extends keyof T>(loader: (componentName?: string) => Promise<T>) => {
	return new Proxy({} as unknown as T, {
		// eslint-disable-next-line consistent-return
		get: (_target, componentName: string | symbol) => {
			if (isString(componentName)) {
				return lazy<Component<T>>(() =>
					loader(componentName).then((context) => ({
						default: context[componentName as U] as Component<T>,
					})),
				);
			}
		},
	});
};
