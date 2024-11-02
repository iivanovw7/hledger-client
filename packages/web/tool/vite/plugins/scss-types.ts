import type { Alias, Plugin } from "vite";

import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";
import postcssModules from "postcss-modules";
import prettier from "prettier";
import * as sass from "sass";
import { createLogger } from "vite";

import { capitalize, getFileName, resolveAlias, toCamelCase } from "../utils";

export type ConfigScssTypesPluginOptions = {
	preprocessorConfig: {
		alias: Alias;
		options: {
			scss: {
				additionalData: string;
			};
		};
	};
};

const logger = createLogger("info");

const wrapString = (value: string) => `'${value}': string;`;

export const configScssTypesPlugin = (options: ConfigScssTypesPluginOptions): Plugin => {
	let {
		preprocessorConfig: {
			alias: stylesAlias,
			options: {
				scss: { additionalData },
			},
		},
	} = options;

	return {
		apply: "serve",
		buildStart: async () => {
			let scssFiles = await findScssFiles(path.resolve(process.cwd(), "src"));

			let resolvedAdditionalScssData = additionalData
				.split("\n")
				.map((line) => {
					let match = line.match(/@use ["']([^"']+)["']/);
					if (match) {
						let resolvedPath = resolveAlias(match[1], stylesAlias);

						return line.replace(match[1], resolvedPath);
					}

					return line;
				})
				.join("\n");

			for (let file of scssFiles) {
				let fileContent = await fs.readFile(file, "utf8");
				let combinedContent = resolvedAdditionalScssData + fileContent;

				let compiledCss = sass.compileString(combinedContent, {
					loadPaths: [path.resolve(process.cwd(), "src")],
					style: "expanded",
				}).css;

				await generateDTS(file, compiledCss);
			}
		},
		name: "vite-plugin-scss-types",
	};
};

const findScssFiles = async (directory: string): Promise<string[]> => {
	let entries = await fs.readdir(directory, { withFileTypes: true });
	let scssFiles: string[] = [];

	for (let entry of entries) {
		let filePath = path.join(directory, entry.name);

		if (entry.isDirectory()) {
			scssFiles.push(...(await findScssFiles(filePath)));
		} else if (entry.isFile() && filePath.endsWith(".module.scss")) {
			scssFiles.push(filePath);
		}
	}

	return scssFiles;
};

const generateDTS = async (file: string, css: string) => {
	let typesFile = path.resolve(path.dirname(file), `${path.basename(file)}.d.ts`);
	let classNames: Record<string, string> = {};

	await postcss([
		postcssModules({
			getJSON: (_, json) => {
				Object.assign(classNames, json);
			},
		}),
	]).process(css, { from: undefined });

	let name = capitalize(toCamelCase(path.basename(file, ".module.scss")));

	let interfaceName = `I${name}ModuleScss`;
	let namespaceName = `${name}ModuleScssNamespace`;
	let moduleName = `${name}ModuleScssModule`;
	let classNameKeys = Object.keys(classNames);

	let typeDefinition = `
		/* eslint-disable */
		// Generated file.
		declare namespace ${namespaceName} {
			export interface ${interfaceName} {
				${classNameKeys.map(wrapString).join("\n")}
			}
		}

		declare const ${moduleName}: ${namespaceName}.${interfaceName};
		export = ${moduleName};
	`;

	let prettierConfig = await prettier.resolveConfig(process.cwd());
	let formatted = await prettier.format(typeDefinition, { ...prettierConfig, parser: "typescript" });

	await fs.writeFile(typesFile, formatted, "utf8");

	logger.info(`Generated: ${getFileName(typesFile)}`);
};
