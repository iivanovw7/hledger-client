import type { CollapsibleContentProperties } from "./collapsible-content";
import type { CollapsibleRootProperties } from "./collapsible-root";
import type { CollapsibleTriggerProperties } from "./collapsible-trigger";

import { CollapsibleContent as Content } from "./collapsible-content";
import { CollapsibleRoot as Root } from "./collapsible-root";
import { CollapsibleTrigger as Trigger } from "./collapsible-trigger";

export type { CollapsibleContentProperties, CollapsibleRootProperties, CollapsibleTriggerProperties };

export { Content, Root, Trigger };

export const Collapsible = Object.assign(Root, {
	Content,
	Trigger,
});
