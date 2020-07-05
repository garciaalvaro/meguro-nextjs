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

declare namespace NodeJS {
	export interface ProcessEnv {
		site_title: string;
		site_description: string;
		site_logo: string | null;
		content_dir: string;
		projects_dir: string;
		pages_dir: string;
	}
}

type EntryType = "project" | "page";
