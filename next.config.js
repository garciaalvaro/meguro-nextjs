const withStylus = require("@zeit/next-stylus");
const unwrap = require("remark-unwrap-images");
const { existsSync } = require("fs");
const path = require("path");

const use_demo =
	!existsSync(path.resolve(__dirname, "./content")) || process.env.USE_DEMO;

const content_dir = use_demo
	? path.resolve(__dirname, "./content-demo")
	: path.resolve(__dirname, "./content");

const has_custom_layouts = !!existsSync(
	path.resolve(content_dir, "layouts/index.ts")
);

const config = use_demo
	? require("./content-demo/config")
	: require("./content/config");

const {
	url_path_prefix,
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
	basePath: url_path_prefix ? `/${url_path_prefix}` : undefined,

	env: {
		font_family_url: font_family_url || "",
		site_title: site_title || "",
		site_description: site_description || "",
		site_logo: site_logo || null,
		sidebar_color: sidebar_color || "",
		sidebar_background_color: sidebar_background_color || "",
		sidebar_menu_pages: sidebar_menu_pages || [],
		has_custom_layouts,

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
				: "[folder]__[local]-[hash:base64:2]",
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
						context: path.resolve(content_dir, "pages"),
						outputPath: "static/images",
						name: "[path][name]-[width].[ext]",

						// Values taken from:
						// https://nextjs.org/docs/basic-features/image-optimization#device-sizes
						sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
