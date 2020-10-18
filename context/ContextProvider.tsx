import React, { FunctionComponent, useState, useEffect } from "react";

import { Context } from "./Context";

interface Props {
	slug: Entry["slug"];
	is_page: Entry["is_page"];
	pages: Entry[];
	projects: Entry[];
}

export const ContextProvider: FunctionComponent<Props> = props => {
	const { slug, is_page, pages, projects } = props;

	const [md_is_loading, setMdIsLoading] = useState(false);

	const [active_path, setActivePath] = useState(`/${slug}`);

	useEffect(() => {
		setActivePath(`/${slug}`);
	}, [slug]);

	return (
		<Context.Provider
			value={{
				slug,
				is_page,
				pages,
				projects,
				setMdIsLoading,
				md_is_loading,
				active_path,
				setActivePath,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
