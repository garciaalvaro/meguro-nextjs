module.exports = {
	moduleNameMapper: {
		"\\.(css|sass)$": "identity-obj-proxy",
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	testMatch: ["<rootDir>/tests/unit/**/*.ts"],
	moduleNameMapper: {
		"@utils": "<rootDir>/utils",
	},
};
