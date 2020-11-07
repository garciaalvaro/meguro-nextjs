import matter from "gray-matter";
import { readdirSync, readFileSync, existsSync } from "fs";

export const getPages = (directory: string): Page[] => {
	const slugs = readdirSync(directory, { withFileTypes: true });

	const pages = slugs.reduce<Page[]>((acc, entity) => {
		const filename = entity.name;
		let page;
		let file_path;

		if (entity.isDirectory()) {
			file_path = `${filename}/index.md`;

			if (existsSync(`${directory}/${file_path}`)) {
				page = readFileSync(`${directory}/${file_path}`, "utf8");
			}
		} else if (new RegExp(".md$").test(`${directory}/${filename}`)) {
			file_path = filename;
			page = readFileSync(`${directory}/${file_path}`, "utf8");
		}

		if (!page || !file_path) {
			return acc;
		}

		const { data: frontmatter } = matter(page);
		const slug = filename.replace(/\.md$/, "");
		const url_path = `/${slug === "home" ? "" : slug}`;

		const thumb_img =
			!frontmatter.thumb_img || /^\/|^http/.test(frontmatter?.thumb_img)
				? frontmatter?.thumb_img
				: `/assets/${slug}/${frontmatter.thumb_img}`;

		return [
			...acc,
			{
				slug,
				url_path,
				file_path,
				frontmatter: {
					...(frontmatter as Page["frontmatter"]),
					thumb_img,
				},
			},
		];
	}, []);

	return pages;
};
