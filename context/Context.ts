import { createContext } from "react";

export const initial_props: ContextProps = {
	slug: "",
	file_path: "",
	pages: [],
	scrollbar_width: 0,

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setMdIsLoading: () => {},
	md_is_loading: false,

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setActiveUrlPath: () => {},
	active_url_path: "",
};

export const Context = createContext<ContextProps>(initial_props);
