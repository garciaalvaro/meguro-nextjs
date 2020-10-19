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
		font_family_url: string;
		body_font_family: string;
		titles_font_family: string;
	}
}

interface ContextProps {
	slug: Entry["slug"];
	is_page: Entry["is_page"];
	pages: Entry[];
	projects: Entry[];
	setMdIsLoading: (is_loading: boolean) => void;
	md_is_loading: boolean;
	setActivePath: (active_path: string) => void;
	active_path: Entry["path"];
}
