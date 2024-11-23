import type { CollapsibleContentProperties } from "./collapsible-content";
import type { CollapsibleRootProperties } from "./collapsible-root";
import type { CollapsibleTriggerProperties } from "./collapsible-trigger";

import { CollapsibleContent } from "./collapsible-content";
import { CollapsibleRoot } from "./collapsible-root";
import { CollapsibleTrigger } from "./collapsible-trigger";

export type { CollapsibleContentProperties, CollapsibleRootProperties, CollapsibleTriggerProperties };

export const Collapsible = Object.assign(CollapsibleRoot, {
	Content: CollapsibleContent,
	Trigger: CollapsibleTrigger,
});
