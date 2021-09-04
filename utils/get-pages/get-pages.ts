import { readdirSync } from "fs";

import type { Util } from "./types";

export const getPages: Util = directory => {
	const slugs = readdirSync(directory, { withFileTypes: true });

	const pages = slugs.reduce<Page[]>((acc, entity) => {
		const filename = entity.name;
		let file_path;

		if (entity.isDirectory()) {
			file_path = `${filename}/index.md`;
		} else if (new RegExp(".md$").test(`${directory}/${filename}`)) {
			file_path = filename;
		}

		if (!file_path) {
			return acc;
		}

		const slug = filename.replace(/\.md$/, "");
		const url_path = `/${slug === "home" ? "" : slug}`;

		const { frontmatter } = require("@content/pages/" +
			filename +
			"/index.md");

		return [
			...acc,
			{
				slug,
				url_path,
				file_path,
				frontmatter: frontmatter as Page["frontmatter"],
			},
		];
	}, []);

	return pages;
};
