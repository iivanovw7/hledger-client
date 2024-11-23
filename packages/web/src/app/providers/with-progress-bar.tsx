import { ProgressBar } from "@/widgets";

export const withProgressBar = (Cmp: ParentComponent): Component => {
	return (properties) => (
		<>
			<Cmp {...properties} />
			<ProgressBar />
		</>
	);
};
