/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import type { AnyObject, Maybe, UnionToIntersection } from "#/utils";

import type { ToCamelCase } from "./string";

import { toCamelCase } from "./string";

type ParseClassNames<T> = UnionToIntersection<
	{
		[ClassName in T as 0]: ClassName extends `${infer BlockOrElement}--${infer Modifier}`
			? {
					[BorE in BlockOrElement as 0]: BorE extends `${infer Block}__${infer Element}`
						? {
								[B in Block as ToCamelCase<B>]: {
									[E in Element as ToCamelCase<E>]: {
										__modifiers__: { [M in Modifier as ToCamelCase<M>]: any };
									};
								};
							}
						: {
								[B in BorE as ToCamelCase<B>]: {
									__modifiers__: { [M in Modifier as ToCamelCase<M>]: any };
								};
							};
				}[0]
			: ClassName extends `${infer Block}__${infer Element}`
				? { [B in Block as ToCamelCase<B>]: { [E in Element as ToCamelCase<E>]: { __className__: ClassName } } }
				: { [B in ClassName as ToCamelCase<B>]: { __className__: ClassName } };
	}[0]
>;

type BEM<T extends Record<string, string>> =
	ParseClassNames<keyof T> extends infer Parsed
		? {
				// @ts-expect-error
				[Block in keyof Parsed]: { block: Handler<Parsed[Block]["__modifiers__"]> } & UnionToIntersection<
					{
						[ElementOrClassNameOrModifiers in keyof Parsed[Block] as 0]: ElementOrClassNameOrModifiers extends
							| "__className__"
							| "__modifiers__"
							? {}
							: {
									[Element in ElementOrClassNameOrModifiers]: Handler<
										// @ts-expect-error
										Parsed[Block][Element]["__modifiers__"]
									>;
								};
					}[0]
				>;
			}
		: never;

type Handler<T> = (
	modifiers?: T extends AnyObject ? (keyof T extends never ? null : Maybe<Partial<T>>) : null,
	...otherClasses: any[]
) => string;

type CamelCaseString = string;
type ClassName = string;
type BlockName = CamelCaseString;
type ElementName = CamelCaseString;
type ModifierName = CamelCaseString;
type Modifiers = Record<ModifierName, ClassName>;

type ElementData = {
	className: ClassName;
	modifiers: Modifiers;
};

type Elements = Record<ElementName, ElementData>;

type BlockData = {
	className: ClassName;
	elements: Elements;
	modifiers: Modifiers;
};

type Blocks = Record<BlockName, BlockData>;

const CLASS_NAME_REGEX =
	/([\dA-Za-z]+(?:-[\dA-Za-z]+)*)(?:__([\dA-Za-z]+(?:-[\dA-Za-z]+)*))?(?:--([\dA-Za-z]+(?:-[\dA-Za-z]+)*))?/;

const NO_MATCH_ARRAY = Array(4) as undefined[];

const createHandler = <M extends Modifiers>(className: ClassName, modifiers: M): Handler<M> => {
	return (optionalModifiers, ...otherClasses) => {
		let classes = [className];

		if (optionalModifiers) {
			for (let key of Object.keys(optionalModifiers)) {
				optionalModifiers[key] && classes.push(modifiers[key]);
			}
		}

		otherClasses.forEach((otherClassName) => {
			if (
				process.env.NODE_ENV !== "production" &&
				typeof otherClassName === "object" &&
				otherClassName !== null
			) {
				throw Error("BEM: objects and arrays are not supported as additional classes");
			}

			return otherClassName && classes.push(otherClassName);
		});

		return classes.join(" ");
	};
};

const getBlock = (parent: Blocks, blockName: BlockName) => {
	if (!parent[blockName]) {
		parent[blockName] = {
			className: "",
			elements: {},
			modifiers: {},
		};
	}

	return parent[blockName];
};

const getElement = (parent: Elements, elementName: ElementName) => {
	if (!parent[elementName]) {
		parent[elementName] = {
			className: "",
			modifiers: {},
		};
	}

	return parent[elementName];
};

const enum CLASS_NAME_TYPE {
	BLOCK,
	BLOCK_MOD,
	ELEMENT,
	ELEMENT_MOD,
}

type ParseResultBlock = {
	blockName: string;
	type: CLASS_NAME_TYPE.BLOCK;
};

type ParseResultBlockModule = {
	blockName: string;
	modifierName: string;
	type: CLASS_NAME_TYPE.BLOCK_MOD;
};

type ParseResultElement = {
	blockName: string;
	elementName: string;
	type: CLASS_NAME_TYPE.ELEMENT;
};

type ParseResultElementModule = {
	blockName: string;
	elementName: string;
	modifierName: string;
	type: CLASS_NAME_TYPE.ELEMENT_MOD;
};

type ParseResult = ParseResultBlock | ParseResultBlockModule | ParseResultElement | ParseResultElementModule;

const parse = (className: string): ParseResult => {
	let matchResult = (CLASS_NAME_REGEX.exec(className) || NO_MATCH_ARRAY).slice(1, 4) as Maybe<string>[];
	let [blockName, elementName, modifierName] = matchResult.map((name) => name && toCamelCase(name)) as [
		string,
		Maybe<string>,
		Maybe<string>,
	];

	if (process.env.NODE_ENV !== "production") {
		if (!blockName) {
			throw Error(`BEM: failed to parse class name: "${className}"`);
		}

		if (elementName && elementName === "block") {
			throw Error(`BEM: do not use "block" as an element name: "${className}"`);
		}
	}

	if (modifierName) {
		if (elementName) {
			return {
				blockName,
				elementName,
				modifierName,
				type: CLASS_NAME_TYPE.ELEMENT_MOD,
			};
		}

		return {
			blockName,
			modifierName,
			type: CLASS_NAME_TYPE.BLOCK_MOD,
		};
	}

	if (elementName) {
		return {
			blockName,
			elementName,
			type: CLASS_NAME_TYPE.ELEMENT,
		};
	}

	return {
		blockName,
		type: CLASS_NAME_TYPE.BLOCK,
	};
};

export const bem = <T extends Record<string, any>>(styles: T) => {
	let blocks: Blocks = {};

	Object.keys(styles).forEach((key) => {
		let parsed = parse(key);
		let block = getBlock(blocks, parsed.blockName);

		switch (parsed.type) {
			case CLASS_NAME_TYPE.BLOCK: {
				block.className = styles[key];
				break;
			}
			case CLASS_NAME_TYPE.BLOCK_MOD: {
				let { modifierName } = parsed;
				block.modifiers[modifierName] = styles[key];
				break;
			}
			case CLASS_NAME_TYPE.ELEMENT: {
				let { elementName } = parsed;
				let element = getElement(block.elements, elementName);
				element.className = styles[key];
				break;
			}
			case CLASS_NAME_TYPE.ELEMENT_MOD: {
				let { elementName, modifierName } = parsed;
				let element = getElement(block.elements, elementName);
				element.modifiers[modifierName] = styles[key];
				break;
			}
		}
	});

	let result: AnyObject = {};

	for (let blockName of Object.keys(blocks)) {
		let { className, elements, modifiers } = blocks[blockName];

		result[blockName] = {
			block: createHandler(className, modifiers),
		};

		for (let elementName of Object.keys(elements)) {
			result[blockName][elementName] = createHandler(
				elements[elementName].className,
				elements[elementName].modifiers,
			);
		}
	}

	return { cls: result as BEM<T> };
};
