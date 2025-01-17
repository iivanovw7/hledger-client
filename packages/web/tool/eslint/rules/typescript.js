export const typescriptRules = {
	"@typescript-eslint/array-type": "error",
	"@typescript-eslint/await-thenable": "error",
	"@typescript-eslint/consistent-generic-constructors": "error",
	"@typescript-eslint/consistent-type-definitions": ["error", "type"],
	"@typescript-eslint/consistent-type-exports": "error",
	"@typescript-eslint/consistent-type-imports": [
		"error",
		{
			fixStyle: "inline-type-imports",
			prefer: "type-imports",
		},
	],
	"@typescript-eslint/dot-notation": "error",
	"@typescript-eslint/method-signature-style": "error",
	"@typescript-eslint/no-array-constructor": "error",
	"@typescript-eslint/no-dupe-class-members": "error",
	"@typescript-eslint/no-duplicate-type-constituents": "error",
	"@typescript-eslint/no-empty-interface": "error",
	"@typescript-eslint/no-explicit-any": "error",
	"@typescript-eslint/no-extra-non-null-assertion": "error",
	"@typescript-eslint/no-for-in-array": "error",
	"@typescript-eslint/no-implied-eval": "error",
	"@typescript-eslint/no-import-type-side-effects": "error",
	"@typescript-eslint/no-mixed-enums": "error",
	"@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
	"@typescript-eslint/no-non-null-asserted-optional-chain": "error",
	"@typescript-eslint/no-redeclare": "off",
	"@typescript-eslint/no-require-imports": "error",
	"@typescript-eslint/no-shadow": "error",
	"@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
	"@typescript-eslint/no-unnecessary-condition": "error",
	"@typescript-eslint/no-unnecessary-type-assertion": "error",
	"@typescript-eslint/no-unused-expressions": [
		"error",
		{
			allowShortCircuit: true,
			allowTaggedTemplates: true,
			allowTernary: true,
		},
	],
	"@typescript-eslint/no-unused-vars": [
		"error",
		{
			argsIgnorePattern: "^_",
			caughtErrorsIgnorePattern: "^_",
			ignoreRestSiblings: true,
			varsIgnorePattern: "^_",
		},
	],
	"@typescript-eslint/no-use-before-define": [
		"error",
		{
			classes: false,
			functions: false,
			variables: false,
		},
	],
	"@typescript-eslint/no-useless-constructor": "error",
	"@typescript-eslint/prefer-optional-chain": "error",
	"@typescript-eslint/restrict-plus-operands": "error",
	"@typescript-eslint/unified-signatures": "error",
	"dot-notation": "off",
	"func-call-spacing": "off",
	"import/no-unresolved": "error",
	"no-array-constructor": "off",
	"no-dupe-class-members": "off",
	"no-implied-eval": "off",
	"no-redeclare": "off",
	"no-shadow": "off",
	"no-undef": "off",
	"no-unused-expressions": "off",
	"no-unused-vars": "off",
	"no-use-before-define": "off",
	"no-useless-constructor": "off",
};
