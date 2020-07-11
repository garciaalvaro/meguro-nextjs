import matter from "gray-matter";
import { readdirSync, readFileSync } from "fs";

export const getEntries = (directory?: string): Entry[] => {
	if (!directory) {
		return [];
	}

	const slugs = readdirSync(directory);

	const entries = slugs.reduce<Entry[]>((acc, slug) => {
		const entry = readFileSync(`${directory}/${slug}/index.md`, "utf8");

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
