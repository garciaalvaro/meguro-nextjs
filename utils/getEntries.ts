import matter from "gray-matter";
import { readdirSync, readFileSync } from "fs";

export const getEntries = (directory?: string): Entry[] => {
	if (!directory) {
		return [];
	}

	const slugs = readdirSync(directory);

	const entries = slugs.reduce<Entry[]>((acc, slug) => {
		const entry = readFileSync(`${directory}/${slug}/index.md`, "utf8");

		const entry_mobile = readFileSync(
			`${directory}/${slug}/index.mobile.md`,
			"utf8"
		);

		const { data: frontmatter, content } = matter(entry);

		let frontmatter_mobile: Entry["frontmatter_mobile"] = {};

		if (entry_mobile) {
			frontmatter_mobile = matter(entry_mobile)
				.data as Entry["frontmatter_mobile"];
		}

		return [
			...acc,
			{
				slug,
				path: `/${slug}`,
				frontmatter: frontmatter as Entry["frontmatter"],
				frontmatter_mobile,
				content,
			},
		];
	}, []);

	return entries;
};
