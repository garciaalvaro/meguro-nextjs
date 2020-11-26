import { createContext } from "react";

export const initial_props: ContextProps = {
	slug: "",
	file_path: "",
	pages: [],

	// eslint-disable-next-line
	setMdIsLoading: () => {},
	md_is_loading: false,

	// eslint-disable-next-line
	setActiveUrlPath: () => {},
	active_url_path: "",
};

export const Context = createContext<ContextProps>(initial_props);
