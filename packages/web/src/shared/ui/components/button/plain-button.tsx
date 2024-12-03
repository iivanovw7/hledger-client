import { Button } from "@kobalte/core/button";

import { mergeDefaultProperties } from "@/shared";

export type PlainButtonProperties = {
	children?: JSX.Element | JSX.Element[];
	class?: string;
	disabled?: boolean | undefined;
	ref?: ((element: HTMLButtonElement) => void) | HTMLButtonElement;
	tabIndex?: number | string | undefined;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const PlainButton = (properties: PlainButtonProperties) => {
	let mergedProperties = mergeDefaultProperties({ type: "button" }, properties);
	let [local, others] = splitProps(mergedProperties, ["ref", "type", "disabled"]);

	return (
		<Button
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
