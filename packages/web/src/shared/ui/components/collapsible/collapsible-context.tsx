export type CollapsibleDataSet = {
	"data-closed": string | undefined;
	"data-disabled": string | undefined;
	"data-expanded": string | undefined;
};

export type CollapsibleContextValue = {
	contentId: Accessor<string | undefined>;
	dataset: Accessor<CollapsibleDataSet>;
	disabled: Accessor<boolean>;
	generateId: (part: string) => string;
	isOpen: Accessor<boolean>;
	registerContentId: (id: string) => () => void;
	shouldMount: Accessor<boolean>;
	toggle: () => void;
};

export const CollapsibleContext = createContext<CollapsibleContextValue>();

export const useCollapsibleContext = () => {
	let context = useContext(CollapsibleContext);

	if (context === undefined) {
		throw new Error("`useCollapsibleContext` must be used within a `Collapsible.Root` component");
	}

	return context;
};
