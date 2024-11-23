import type { CollapsibleRootProps } from "@kobalte/core/collapsible";

import { Root } from "@kobalte/core/collapsible";

export type CollapsibleRootProperties = {
	children: JSX.Element | JSX.Element[];
	class?: string;
	style?: JSX.CSSProperties;
} & CollapsibleRootProps;

export const CollapsibleRoot: Component<CollapsibleRootProperties> = (properties) => {
	return <Root {...properties} />;
};
