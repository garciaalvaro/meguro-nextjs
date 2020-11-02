import React, { FunctionComponent, useState, useEffect } from "react";

import { Context } from "./Context";

interface Props {
	slug: Entry["slug"];
	file_path: Entry["file_path"];
	is_page: Entry["is_page"];
	pages: Entry[];
	projects: Entry[];
}

export const ContextProvider: FunctionComponent<Props> = props => {
	const { slug, file_path, is_page, pages, projects } = props;

	const [md_is_loading, setMdIsLoading] = useState(false);

	const [active_url_path, setActiveUrlPath] = useState(`/${slug}`);

	useEffect(() => {
		setActiveUrlPath(`/${slug}`);
	}, [slug]);

	return (
		<Context.Provider
			value={{
				slug,
				file_path,
				is_page,
				pages,
				projects,
				setMdIsLoading,
				md_is_loading,
				active_url_path,
				setActiveUrlPath,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
