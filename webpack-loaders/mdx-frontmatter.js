const matter = require("gray-matter");
const path = require("path");

module.exports = function (src) {
	const { content, data: frontmatter } = matter(src);

	if (Object.keys(frontmatter).length) {
		const file_path = path.relative(
			path.resolve(__dirname, "../components/Image"),
			this.context
		);

		const frontmatter_updated = JSON.stringify({
			...frontmatter,
			path: file_path.replace(/^\.\.\/\.\.\/content(-demo)?\//, ""),
		});

		const src_updated =
			`export const frontmatter = ${frontmatter_updated};` +
			"\n" +
			content;

		return src_updated;
	}

	return src;
};
