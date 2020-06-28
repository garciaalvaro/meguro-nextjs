interface Entry {
	path: string;
	slug: string;
	content: string;
	frontmatter: {
		title: string;
		subtitle: string;
		thumb_img: string;
		[key: string]: string | number;
	};
}

declare module "*.styl";
