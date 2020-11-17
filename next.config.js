const withStylus = require("@zeit/next-stylus");
const { existsSync } = require("fs");
const path = require("path");
const unwrap = require("remark-unwrap-images");

const use_demo = !existsSync(path.resolve(__dirname, "./content"));

const content_dir = use_demo
	? path.resolve(__dirname, "./content-demo")
	: path.resolve(__dirname, "./content");

const config = use_demo
	? require("./content-demo/config")
	: require("./content/config");

const {
	font_family_url,
	open_external_links_in_new_tab,
	site_title,
	site_description,
	site_logo,
	sidebar_color,
	sidebar_background_color,
	sidebar_menu_pages,
} = config;

module.exports = withStylus({
	env: {
		font_family_url: font_family_url || "",
		site_title: site_title || "",
		site_description: site_description || "",
		site_logo: site_logo || null,
		sidebar_color: sidebar_color || "",
		sidebar_background_color: sidebar_background_color || "",
		sidebar_menu_pages: sidebar_menu_pages || [],

		open_external_links_in_new_tab:
			open_external_links_in_new_tab === undefined
				? false
				: open_external_links_in_new_tab,

		custom_css_file: existsSync(path.resolve(content_dir, "src/index.styl"))
			? path.resolve(content_dir, "src/index.styl")
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
				: "[name]__[local]-[hash:base64:2]",
	},

	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.mdx?$/,
			use: [
				"babel-loader",

				{
					loader: path.join(
						__dirname,
						"webpack-loaders/image-data.js"
					),
				},

				{
					loader: "@mdx-js/loader",
					options: { remarkPlugins: [unwrap] },
				},

				{
					loader: path.join(
						__dirname,
						"webpack-loaders/mdx-frontmatter.js"
					),
				},
			],
		});

		config.module.rules.push({
			test: /\.(png|jpe?g|gif)$/i,
			use: [
				{
					loader: "responsive-loader",
					options: {
						adapter: require("responsive-loader/sharp"),
						outputPath: "static/qqq", //TODO
						name: "[name]-[width].[ext]",
					},
				},
			],
		});

		if (!isServer) {
			config.node = {
				fs: "empty",
			};
		}

		config.resolve.alias["@"] = path.join(__dirname, "components");
		config.resolve.alias["@context"] = path.join(__dirname, "context");
		config.resolve.alias["@layouts"] = path.join(__dirname, "layouts");
		config.resolve.alias["@utils"] = path.join(__dirname, "utils");
		config.resolve.alias["@content"] = path.join(
			__dirname,
			use_demo ? "content-demo" : "content"
		);

		return config;
	},
});
