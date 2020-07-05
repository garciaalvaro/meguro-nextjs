const matter = require("gray-matter");

module.exports = function (src) {
	const { content, data: frontmatter } = matter(src);

	return (
		`export const frontmatter = ${JSON.stringify(frontmatter)};` +
		"\n" +
		content
	);
};
