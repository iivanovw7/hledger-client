import eslintTypescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import { defineFlatConfig } from "eslint-define-config";
import eslintImport from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import n from "eslint-plugin-n";
import nodeImport from "eslint-plugin-node-import";
import perfectionist from "eslint-plugin-perfectionist";
import preferArrow from "eslint-plugin-prefer-arrow";
import preferLet from "eslint-plugin-prefer-let";
import promise from "eslint-plugin-promise";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import fs from "node:fs";
import path from "node:path";

import { importRules } from "./tool/eslint/rules/import.js";
import { nRules } from "./tool/eslint/rules/n.js";
import { promiseRules } from "./tool/eslint/rules/promise.js";
import { sonarjsRules } from "./tool/eslint/rules/sonarjs.js";
import { styleRules } from "./tool/eslint/rules/style.js";
import { typescriptRules } from "./tool/eslint/rules/typescript.js";
import { unicornRules } from "./tool/eslint/rules/unicorn.js";

const autoImportConfigFilePath = path.resolve("./.eslintrc-auto-import.json");
const autoImportConfig = JSON.parse(fs.readFileSync(autoImportConfigFilePath, "utf-8"));

// eslint-disable-next-line import/no-default-export
export default defineFlatConfig([
	perfectionist.configs["recommended-alphabetical"],
	jsdoc.configs["flat/recommended"],
	{
		ignores: ["**/node_modules/**", "**/dist/**", ".git/**", "**/build/**"],
	},
	{
		languageOptions: {
			ecmaVersion: 2023,
			globals: {
				...globals.browser,
				...globals.es2021,
				...globals.node,
			},
			sourceType: "module",
		},
		plugins: {
			import: eslintImport,
			jsdoc,
			n,
			"node-import": nodeImport,
			"prefer-arrow": preferArrow,
			"prefer-let": preferLet,
			promise,
			sonarjs,
			unicorn,
		},
		rules: {
			...unicornRules,
			...sonarjsRules,
			...importRules,
			...promiseRules,
			...nRules,
			...styleRules,
			"arrow-body-style": "off",
			"perfectionist/sort-imports": [
				"error",
				{
					customGroups: {
						type: {
							charts: ["chart.js*, chartjs*"],
							kobalte: ["@kobalte*"],
							luxon: ["luxon"],
							ramda: ["ramda", "ramda-adjunct"],
							solid: ["@solid*", "solid*", "solid-js/web", "@solid-primitives/*", "solid-presence"],
						},
						value: {
							charts: ["chart.js*, chartjs*"],
							kobalte: ["@kobalte*"],
							luxon: ["luxon"],
							ramda: ["ramda", "ramda-adjunct"],
							solid: ["@solid*", "solid*", "solid-js/web", "@solid-primitives/*", "solid-presence"],
						},
					},
					environment: "node",
					groups: [
						"solid",
						"kobalte",
						"luxon",
						"ramda",
						"charts",
						"type",
						["builtin", "external"],
						"internal-type",
						"internal",
						["parent-type", "sibling-type", "index-type"],
						["parent", "sibling", "index"],
						"object",
						"unknown",
						"style",
					],
					ignoreCase: true,
					internalPattern: ["~/**"],
					matcher: "minimatch",
					maxLineLength: undefined,
					newlinesBetween: "always",
					order: "asc",
					specialCharacters: "keep",
					type: "alphabetical",
				},
			],
			"unicorn/filename-case": [
				"error",
				{
					cases: { kebabCase: true },
				},
			],
			"unicorn/prevent-abbreviations": [
				"error",
				{
					ignore: ["env", "Env"],
				},
			],
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx", "**/.d.ts"],
		languageOptions: {
			globals: {
				...autoImportConfig.globals,
			},
			parser: typescriptParser,
			parserOptions: {
				project: ["./tsconfig.json"],
				tsconfigRootDir: process.cwd(),
			},
		},
		plugins: {
			"@typescript-eslint": eslintTypescript,
		},
		rules: {
			...typescriptRules,
			...jsdoc.configs["flat/recommended-typescript"].rules,
		},
		settings: {
			"import/resolver": {
				typescript: {
					project: ["./tsconfig.json"],
				},
			},
		},
	},
	{
		files: ["**/icon.tsx", "**/main.tsx"],
		rules: {
			"import/no-unresolved": "off",
		},
	},
]);
