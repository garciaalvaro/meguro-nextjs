import matter from "gray-matter";
import { readdirSync, readFileSync } from "fs";

export const getEntries = (directory: string): Entry[] => {
	const slugs = readdirSync(directory);

	const entries = slugs.reduce<Entry[]>((acc, filename) => {
		const entry = readFileSync(`${directory}/${filename}`, "utf8");
		const { data: frontmatter } = matter(entry);
		const slug = filename.replace(/\.md$/, "");
		const path = `/${slug === "home" ? "" : slug}`;
		const is_page = directory.includes("/pages/");

		return [
			...acc,
			{
				is_page,
				slug,
				path,
				frontmatter: frontmatter as Entry["frontmatter"],
			},
		];
	}, []);

	return entries;
};
