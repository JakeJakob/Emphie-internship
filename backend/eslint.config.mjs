import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		ignores: ["**/node_modules/**", "**/dist/**", "**/.*"],
	},
	{
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"error", // or "error"
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
		},
	},
];
