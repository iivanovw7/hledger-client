import { createGenerateId, mergeDefaultProperties } from "@/shared";

import type { CollapsibleContextValue, CollapsibleDataSet } from "./collapsible-context";

import { createDisclosureState, createRegisterId } from "../../primitives";
import { CollapsibleContext } from "./collapsible-context";

export type CollapsibleRootProperties = {
	children: JSX.Element[];
	class?: string;
	defaultOpen?: boolean;
	disabled?: boolean;
	forceMount?: boolean;
	id?: string;
	onOpenChange?: (isOpen: boolean) => void;
	open?: boolean;
	style?: JSX.CSSProperties;
} & Partial<CollapsibleDataSet>;

export const CollapsibleRoot = (properties: CollapsibleRootProperties) => {
	let defaultId = `collapsible-${createUniqueId()}`;

	let mergedProperties = mergeDefaultProperties({ id: defaultId }, properties);

	let [local, others] = splitProps(mergedProperties, [
		"style",
		"open",
		"defaultOpen",
		"onOpenChange",
		"disabled",
		"forceMount",
		"children",
	]);

	let [contentId, setContentId] = createSignal<string>();

	let disclosureState = createDisclosureState({
		defaultOpen: () => local.defaultOpen,
		onOpenChange: (isOpen) => local.onOpenChange?.(isOpen),
		open: () => local.open,
	});

	let dataset: Accessor<CollapsibleDataSet> = createMemo(() => ({
		"data-closed": disclosureState.isOpen() ? undefined : "",
		"data-disabled": local.disabled ? "" : undefined,
		"data-expanded": disclosureState.isOpen() ? "" : undefined,
	}));

	let context: CollapsibleContextValue = {
		contentId,
		dataset,
		disabled: () => local.disabled ?? false,
		generateId: createGenerateId(() => others.id),
		isOpen: disclosureState.isOpen,
		registerContentId: createRegisterId(setContentId),
		shouldMount: () => local.forceMount || disclosureState.isOpen(),
		toggle: disclosureState.toggle,
	};

	return (
		<CollapsibleContext.Provider value={context}>
			<div style={local.style} {...dataset()} {...others}>
				{local.children}
			</div>
		</CollapsibleContext.Provider>
	);
};
