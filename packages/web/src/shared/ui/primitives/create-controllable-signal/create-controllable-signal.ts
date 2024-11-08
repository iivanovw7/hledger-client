import { accessWith } from "@solid-primitives/utils";
import { createMemo, createSignal, untrack } from "solid-js";
import type { Accessor } from "solid-js";

export type CreateControllableSignalProperties<T> = {
	defaultValue?: Accessor<T | undefined>;
	onChange?: (value: T) => void;
	value?: Accessor<T | undefined>;
};

export const createControllableSignal = <T>(properties: CreateControllableSignalProperties<T>) => {
	let [_value, _setValue] = createSignal(properties.defaultValue?.());
	let isControlled = createMemo(() => properties.value?.() !== undefined);
	let value = createMemo(() => (isControlled() ? properties.value?.() : _value()));

	let setValue = (next: ((previous: T) => T) | Exclude<T, Function>) => {
		untrack(() => {
			let nextValue = accessWith(next, value() as T);

			if (!Object.is(nextValue, value())) {
				if (!isControlled()) {
					_setValue(nextValue as Exclude<T, Function>);
				}

				properties.onChange?.(nextValue);
			}

			return nextValue;
		});
	};

	return [value, setValue] as const;
};

export const createControllableBooleanSignal = (properties: CreateControllableSignalProperties<boolean>) => {
	let [_value, setValue] = createControllableSignal(properties);

	let value: Accessor<boolean> = () => _value() ?? false;

	return [value, setValue] as const;
};

export const createControllableArraySignal = <T>(properties: CreateControllableSignalProperties<T[]>) => {
	let [_value, setValue] = createControllableSignal(properties);

	let value: Accessor<T[]> = () => _value() ?? [];

	return [value, setValue] as const;
};

export const createControllableSetSignal = <T>(properties: CreateControllableSignalProperties<Set<T>>) => {
	let [_value, setValue] = createControllableSignal(properties);

	let value: Accessor<Set<T>> = () => _value() ?? new Set();

	return [value, setValue] as const;
};
