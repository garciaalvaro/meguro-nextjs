interface Entry {
	is_page: boolean;
	path: string;
	slug: string;
	frontmatter: {
		title: string;
		subtitle?: string;
		thumb_img: string;
		layout?: string;
	};
}

type EntryType = "project" | "page";

declare module "*.styl" {
	const classNames: Record<string, string>;
	export = classNames;
}

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

interface Layout {
	name: string;
	breakpoint: number;
	components_desktop: Record<string, FunctionComponent<StylesProps>>;
	components_mobile: Record<string, FunctionComponent<StylesProps>>;
}
