module.exports = {
	parser: "@typescript-eslint/parser",

	ignorePatterns: [".next", "node_modules", "public"],

	rules: {
		"react/prop-types": "off",
		"@typescript-eslint/no-var-requires": "off",
	},

	extends: [
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"prettier/react",
		"prettier/@typescript-eslint",
	],

	env: {
		browser: true,
		node: true,
		es2020: true,
	},

	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},

	settings: {
		react: {
			version: "detect",
		},
	},
};
