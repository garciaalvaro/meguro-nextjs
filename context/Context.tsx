import React, { createContext } from "react";

interface ContextProps {
	setBreakingPoint: React.Dispatch<React.SetStateAction<number>>;
	is_mobile: boolean;
	url_path: string;
}

export const Context = createContext<ContextProps>({
	setBreakingPoint: () => undefined,
	is_mobile: false,
	url_path: "",
});
