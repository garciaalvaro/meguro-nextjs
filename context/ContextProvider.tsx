import React, { useState, useEffect } from "react";
import type { FunctionComponent } from "react";

import { Context } from "./Context";

interface Props {
	slug: Page["slug"];
	file_path: Page["file_path"];
	pages: Page[];
}

export const ContextProvider: FunctionComponent<Props> = props => {
	const { slug, file_path, pages } = props;

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
				pages,
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
