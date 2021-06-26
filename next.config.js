const unwrap = require("remark-unwrap-images");
const { existsSync } = require("fs");
const path = require("path");

const {
	getContentDir: getContentDirRaw,
	config,
	base_url_path,
} = require("./config");

const getContentDir = extra => getContentDirRaw(extra);

const has_custom_layouts = !!existsSync(getContentDir("layouts/index.ts"));

const {
	lang,
	font_family_url,
	open_external_links_in_new_tab,
	site_title,
	site_description,
	site_favicon,
	site_logo,
	site_author,
	sidebar_menu_pages,
} = config;

module.exports = {
	webpack5: false,

	basePath: config.base_url_prefix ? base_url_path : undefined,

	env: {
		lang: lang || "en",
		font_family_url: font_family_url || "",
		site_title: site_title || "",
		site_description: site_description || "",
		sidebar_menu_pages: sidebar_menu_pages || [],
		site_logo: site_logo || "",
		site_favicon: site_favicon || "",
		site_author: site_author || "",
		has_custom_layouts,

		open_external_links_in_new_tab:
			open_external_links_in_new_tab === undefined
				? false
				: open_external_links_in_new_tab,

		custom_css_file: existsSync(getContentDir("src/index.sass"))
			? getContentDir("src/index.sass")
			: null,

		pages_dir: existsSync(getContentDir("pages"))
			? getContentDir("pages")
			: null,
	},

	webpack: (config, { isServer }) => {
		config.module.rules.push({
			test: /\.mdx?$/,
			use: [
				"babel-loader",

				{
					loader: path.resolve(
						__dirname,
						"webpack-loaders/image-data.js"
					),
				},

				{
					loader: "@mdx-js/loader",
					options: { remarkPlugins: [unwrap] },
				},

				{
					loader: path.resolve(
						__dirname,
						"webpack-loaders/mdx-frontmatter.js"
					),
				},
			],
		});

		config.module.rules.push({
			test: /\.(png|jpe?g|gif)$/i,
			include: getContentDir("pages"),
			use: [
				{
					loader: "responsive-loader",
					options: {
						adapter: require("responsive-loader/sharp"),
						context: getContentDir("pages"),
						outputPath: "static/images",
						name: "[path][name]-[width].[ext]",

						// Values taken from:
						// https://nextjs.org/docs/basic-features/image-optimization#device-sizes
						sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
					},
				},
			],
		});

		config.module.rules.push({
			test: /\.(png|jpe?g|gif)$/i,
			include: getContentDir("assets"),
			use: [
				{
					loader: "responsive-loader",
					options: {
						...config.module.rules.slice(-1)[0].use[0].options,
						context: getContentDir("assets"),
					},
				},
			],
		});

		if (!isServer) {
			config.node = {
				fs: "empty",
			};
		}

		config.resolve.alias["@components"] = path.resolve(
			__dirname,
			"components"
		);
		config.resolve.alias["@context"] = path.resolve(__dirname, "context");
		config.resolve.alias["@layouts"] = path.resolve(__dirname, "layouts");
		config.resolve.alias["@hooks"] = path.resolve(__dirname, "hooks");
		config.resolve.alias["@utils"] = path.resolve(__dirname, "utils");
		config.resolve.alias["@content"] = getContentDir();

		return config;
	},
};
