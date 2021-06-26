interface Page {
	url_path: string;
	file_path: string;
	slug: string;
	frontmatter: {
		title: string;
		subtitle?: string;
		thumb_img: string;
		layout: string;
	};
}

declare module "*.sass" {
	const classNames: Record<string, string>;
	export = classNames;
}

declare namespace NodeJS {
	export interface ProcessEnv {
		lang: string;
		font_family_url: string;
		open_external_links_in_new_tab: boolean;
		site_title: string;
		site_description: string;
		site_logo: string;
		site_favicon: string;
		site_author: string;
		pages_dir: string;
		sidebar_menu_pages: Page["slug"][];
		custom_css_file: string;
	}
}

interface ContextProps {
	slug: Page["slug"];
	file_path: Page["file_path"];
	pages: Page[];
	scrollbar_width: number;
	setMdIsLoading: (is_loading: boolean) => void;
	md_is_loading: boolean;
	setActiveUrlPath: (active_url_path: string) => void;
	active_url_path: Page["url_path"];
	setIsOneColumn: (is_one_column: boolean) => void;
	is_one_column: boolean;
}

interface Layout {
	components: Record<string, React.ComponentType>;
	breakpoint: number;
	number_of_columns: number;
}
