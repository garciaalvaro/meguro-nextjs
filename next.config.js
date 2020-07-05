const withStylus = require("@zeit/next-stylus");
const { existsSync, readFileSync } = require("fs");
const path = require("path");

const use_demo = !existsSync(path.resolve(__dirname, "./content"));

const content_dir = use_demo
	? path.resolve(__dirname, "./content-demo")
	: path.resolve(__dirname, "./content");

const { site_title, site_description, site_logo } = JSON.parse(
	readFileSync(`${content_dir}/data.json`, "utf8")
);

module.exports = withStylus({
	env: {
		site_title: site_title || "",
		site_description: site_description || "",
		site_logo: site_logo || null,

		content_dir,

		projects_dir: existsSync(path.resolve(content_dir, "projects"))
			? path.resolve(content_dir, "projects")
			: null,

		pages_dir: existsSync(path.resolve(content_dir, "pages"))
			? path.resolve(content_dir, "pages")
			: null,
	},

	cssModules: true,
	cssLoaderOptions: {
		localIdentName:
			process.env.NODE_ENV === "production"
				? "[hash:base64]"
				: "[name]__[local]-[hash:base64:1]",
	},

	webpack: (config, { isServer }) => {
		config.resolveLoader.modules = [
			...config.resolveLoader.modules,
			path.resolve(__dirname, "webpack-loaders"),
		];

		config.module.rules.push({
			test: /\.mdx?$/,
			use: ["babel-loader", "@mdx-js/loader", "mdx-frontmatter"],
		});

		if (!isServer) {
			config.node = {
				fs: "empty",
			};
		}

		config.resolve.alias["@"] = path.join(__dirname, "components");
		config.resolve.alias["@utils"] = path.join(__dirname, "utils");
		config.resolve.alias["@context"] = path.join(__dirname, "context");

		return config;
	},
});
