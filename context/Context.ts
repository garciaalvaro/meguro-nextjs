import { createContext } from "react";

interface ContextProps {
	layout: Layout;
	is_mobile: boolean;
	url_path: string;
}

export const Context = createContext<ContextProps>({
	layout: {
		name: "",
		breakpoint: 0,
		components_desktop: [],
		components_mobile: [],
	},
	is_mobile: false,
	url_path: "",
});
