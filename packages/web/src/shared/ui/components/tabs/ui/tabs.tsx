import type { TabsContentProperties } from "./tabs-content";
import type { TabsListProperties } from "./tabs-list";
import type { TabsRootProperties } from "./tabs-root";
import type { TabsTriggerProperties } from "./tabs-trigger";

import { TabsContent } from "./tabs-content";
import { TabsList } from "./tabs-list";
import { TabsRoot } from "./tabs-root";
import { TabsTrigger } from "./tabs-trigger";

export type { TabsContentProperties, TabsListProperties, TabsRootProperties, TabsTriggerProperties };

export const Tabs = Object.assign(TabsRoot, {
	Content: TabsContent,
	List: TabsList,
	Trigger: TabsTrigger,
});
