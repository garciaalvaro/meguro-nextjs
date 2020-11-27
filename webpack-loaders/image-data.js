const path = require("path");

module.exports = function (src) {
	const relative_path = path.relative(
		path.resolve(__dirname, "../components/Image"),
		this.context
	);

	const src_updated = src.replace(
		/("src":)/g,

		`"path": "${relative_path.replace(
			/^\.\.\/\.\.\/content(-demo)?\//,
			""
		)}",$1`
	);

	return src_updated;
};
