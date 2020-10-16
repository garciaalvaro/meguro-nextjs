import React, { FunctionComponent } from "react";

import { Context } from "./Context";

export const ContextProvider: FunctionComponent<ContextProps> = props => {
	const { slug, is_page, pages, projects } = props;

	return (
		<Context.Provider
			value={{
				slug,
				is_page,
				pages,
				projects,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
