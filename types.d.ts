interface Page {
	url_path: string;
	file_path: string;
	slug: string;
	frontmatter: {
		title: string;
		subtitle?: string;
		thumb_img: string;
		layout?: string;
	};
}

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
		pages_dir: string;
		font_family_url: string;
	}
}

interface ContextProps {
	slug: Page["slug"];
	file_path: Page["file_path"];
	pages: Page[];
	setMdIsLoading: (is_loading: boolean) => void;
	md_is_loading: boolean;
	setActiveUrlPath: (active_url_path: string) => void;
	active_url_path: Page["url_path"];
}
