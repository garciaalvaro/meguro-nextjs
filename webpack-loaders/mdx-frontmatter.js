const matter = require("gray-matter");

module.exports = function (src) {
	const { content, data: frontmatter } = matter(src);

	if (Object.keys(frontmatter).length) {
		return (
			`export const frontmatter = ${JSON.stringify(frontmatter)};` +
			"\n" +
			content
		);
	}

	return src;
};
