interface Entry {
	path: string;
	slug: string;
	content: string;
	frontmatter: {
		title: string;
		subtitle: string;
		thumb_img: string;
		description_width?: number;
		[key: string]: string | number;
	};
}

declare module "*.styl";
