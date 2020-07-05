import matter from "gray-matter";
import { readdirSync, readFileSync } from "fs";

export const getEntries = (directory?: string): Entry[] => {
	if (!directory) {
		return [];
	}

	const files = readdirSync(directory);

	const slugs = files.reduce<string[]>((acc, file) => {
		if (!file.match(/\.md$/) || file.match(/\.mobile\.md$/)) {
			return acc;
		}

		return [...acc, file.replace(/\.md$/, "")];
	}, []);

	const entries = slugs.reduce<Entry[]>((acc, slug) => {
		const entry = readFileSync(`${directory}/${slug}.md`, "utf8");

		const { data: frontmatter, content } = matter(entry);

		return [
			...acc,
			{
				slug,
				path: `/${slug}`,
				frontmatter: frontmatter as Entry["frontmatter"],
				content,
			},
		];
	}, []);

	return entries;
};
