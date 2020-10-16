import React, { FunctionComponent } from "react";
import Head from "next/head";

import { ContextProvider } from "@context";
import "./Page.styl";

interface Props extends ContextProps {
	page_title?: string;
}

export const Page: FunctionComponent<Props> = props => {
	// process can't be destructured as Webpack replaces
	// the string using the DefinePlugin.
	const site_title = process.env.site_title;
	const site_description = process.env.site_description;
	const { page_title, slug, is_page, pages, projects } = props;
	const title = page_title ? `${site_title} | ${page_title}` : site_title;

	// TODO: Complete meta tags

	return (
		<ContextProvider
			slug={slug}
			is_page={is_page}
			pages={pages}
			projects={projects}
		>
			<Head>
				<title>{title}</title>
				<meta property="description" content={site_description} />
				<meta property="og:title" content={title} />
			</Head>

			{props.children}
		</ContextProvider>
	);
};
