import { createContext } from "react";

export const initial_props: ContextProps = {
	slug: "",
	is_page: true,
	pages: [],
	projects: [],
};

export const Context = createContext<ContextProps>(initial_props);
