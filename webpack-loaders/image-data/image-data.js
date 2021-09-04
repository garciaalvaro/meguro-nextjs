const path = require("path");

const { getContentDir } = require(path.join(process.cwd(), "config"));

module.exports = src => {
	const relative_path = path.relative(getContentDir(), this.context);

	let src_updated = src;

	src_updated = src_updated.replace(
		/(<img[\s\S]+?src=")([^"]+")/g,
		`$1${relative_path}/$2`
	);

	src_updated = src_updated.replace(
		/(<img[\s\S]+?"src": ")([^"/]+")/g,
		`$1${relative_path}/$2`
	);

	src_updated = src_updated.replace(
		/("thumb_img": ")([^"/]+")/,
		`$1${relative_path}/$2`
	);

	return src_updated;
};
