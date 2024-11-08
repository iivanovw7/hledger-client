/* eslint-disable @typescript-eslint/no-explicit-any */

import { isFunction } from "./lang";

export const callHandler = <T, E extends Event>(
	event: { currentTarget: T; target: Element } & E,
	handler: JSX.EventHandlerUnion<T, E> | undefined,
) => {
	if (handler) {
		if (isFunction(handler)) {
			handler(event);
		} else {
			handler[0](handler[1], event);
		}
	}

	return event.defaultPrevented;
};

export const composeEventHandlers = <T>(handlers: (JSX.EventHandlerUnion<T, any> | undefined)[]) => {
	return (event: any) => {
		for (let handler of handlers) {
			callHandler(event, handler);
		}
	};
};
