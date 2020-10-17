import { createContext } from "react";

export const initial_props: ContextProps = {
	slug: "",
	is_page: true,
	pages: [],
	projects: [],

	// eslint-disable-next-line
	setMdIsLoading: () => {},
	md_is_loading: false,
};

export const Context = createContext<ContextProps>(initial_props);
