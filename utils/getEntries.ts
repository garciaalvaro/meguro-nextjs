import matter from "gray-matter";
import { readdirSync, readFileSync, existsSync } from "fs";

export const getEntries = (directory: string): Entry[] => {
	const slugs = readdirSync(directory, { withFileTypes: true });

	const entries = slugs.reduce<Entry[]>((acc, entity) => {
		const filename = entity.name;
		let entry;
		let file_path;

		if (entity.isDirectory()) {
			file_path = `${filename}/index.md`;

			if (existsSync(`${directory}/${file_path}`)) {
				entry = readFileSync(`${directory}/${file_path}`, "utf8");
			}
		} else if (new RegExp(".md$").test(`${directory}/${filename}`)) {
			file_path = filename;
			entry = readFileSync(`${directory}/${file_path}`, "utf8");
		}

		if (!entry || !file_path) {
			return acc;
		}

		const { data: frontmatter } = matter(entry);
		const slug = filename.replace(/\.md$/, "");
		const url_path = `/${slug === "home" ? "" : slug}`;
		const is_page = directory.includes("/pages/");

		const thumb_img =
			!frontmatter.thumb_img || /^\/|^http/.test(frontmatter?.thumb_img)
				? frontmatter?.thumb_img
				: `/assets/${slug}/${frontmatter.thumb_img}`;

		return [
			...acc,
			{
				is_page,
				slug,
				url_path,
				file_path,
				frontmatter: {
					...(frontmatter as Entry["frontmatter"]),
					thumb_img,
				},
			},
		];
	}, []);

	return entries;
};
