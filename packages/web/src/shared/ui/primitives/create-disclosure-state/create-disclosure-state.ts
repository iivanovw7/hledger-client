import { access } from "@solid-primitives/utils";
import type { MaybeAccessor } from "@solid-primitives/utils";
import type { Accessor } from "solid-js";

import { createControllableBooleanSignal } from "../create-controllable-signal";

export type CreateDisclosureStateProperties = {
	defaultOpen?: MaybeAccessor<boolean | undefined>;
	onOpenChange?: (isOpen: boolean) => void;
	open?: MaybeAccessor<boolean | undefined>;
};

export type CreateDisclosureStateResult = {
	close: () => void;
	isOpen: Accessor<boolean>;
	open: () => void;
	setIsOpen: (next: ((previous: boolean) => boolean) | boolean) => void;
	toggle: () => void;
};

export const createDisclosureState = (
	properties: CreateDisclosureStateProperties = {},
): CreateDisclosureStateResult => {
	let [isOpen, setIsOpen] = createControllableBooleanSignal({
		defaultValue: () => !!access(properties.defaultOpen),
		onChange: (value) => properties.onOpenChange?.(value),
		value: () => access(properties.open),
	});

	let open = () => {
		setIsOpen(true);
	};

	let close = () => {
		setIsOpen(false);
	};

	let toggle = () => {
		isOpen() ? close() : open();
	};

	return {
		close,
		isOpen,
		open,
		setIsOpen,
		toggle,
	};
};
