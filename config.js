const { existsSync } = require("fs");
const path = require("path");

const use_demo =
	process.env.USE_DEMO || !existsSync(path.resolve(__dirname, "content"));

// TODO: Cast from schema?
const config = use_demo
	? require("./content-demo/config")
	: require("./content/config");

const port = parseInt(process.env.PORT, 10) || 3000;

const base_url_path = config.base_url_prefix
	? `/${config.base_url_prefix}`
	: "/";

const base_url_path_with_slash = config.base_url_prefix
	? `/${config.base_url_prefix}/`
	: "/";

const getContentDir = (extra = "") => {
	return path.resolve(
		__dirname,
		use_demo ? "content-demo" : "content",
		extra
	);
};

module.exports = {
	config,
	base_url_path,
	base_url_path_with_slash,
	getContentDir,
	port,
	use_demo,
};
