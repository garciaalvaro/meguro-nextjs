const { existsSync } = require("fs");
const path = require("path");

const use_demo =
	process.env.USE_DEMO === "yes" ||
	!existsSync(path.resolve(__dirname, "content"));

// TODO: Cast from schema?
const config = use_demo
	? require("./content-demo/config")
	: require("./content/config");

const port = process.env.PORT || 3000;

const base_url_path = config.base_url_prefix
	? `/${config.base_url_prefix}`
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
	getContentDir,
	port,
	use_demo,
};
