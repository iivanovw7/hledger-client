import { mergeDefaultProperties } from "@/shared";

export type PlainButtonProperties = {
	children?: JSX.Element | JSX.Element[];
	class?: string;
	disabled?: boolean | undefined;
	ref?: ((element: HTMLButtonElement) => void) | HTMLButtonElement;
	tabIndex?: number | string | undefined;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const PlaintButton = (properties: PlainButtonProperties) => {
	let mergedProperties = mergeDefaultProperties({ type: "button" }, properties);
	let [local, others] = splitProps(mergedProperties, ["ref", "type", "disabled"]);

	return (
		<button
			disabled={local.disabled}
			ref={local.ref}
			role="button"
			type={local.type}
			{...(!local.disabled && {
				tabIndex: 0,
			})}
			{...(local.disabled && {
				"aria-disabled": true,
				"data-disabled": "",
			})}
			{...others}
		/>
	);
};
