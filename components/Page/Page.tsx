import React, { FunctionComponent } from "react";
import Head from "next/head";

import "./Page.styl";
import { ContextProvider } from "@context";

interface Props {
	page_title?: string;
	layout_name?: string;
	url_path: string;
}

export const Page: FunctionComponent<Props> = props => {
	// process can't be destructured as Webpack replaces
	// the string using the DefinePlugin
	const site_title = process.env.site_title;
	const site_description = process.env.site_description;
	const { url_path, page_title, layout_name } = props;
	const title = page_title ? `${site_title} | ${page_title}` : site_title;

	// TODO: Complete meta tags

	return (
		<ContextProvider layout_name={layout_name} url_path={url_path}>
			<Head>
				<title>{title}</title>
				<meta property="description" content={site_description} />
				<meta property="og:title" content={title} />
			</Head>

			{props.children}
		</ContextProvider>
	);
};
