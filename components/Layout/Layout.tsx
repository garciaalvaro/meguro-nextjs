import React, { FunctionComponent } from "react";
import Head from "next/head";

import "./Layout.styl";
import { ContextProvider } from "@context";

interface Props {
	page_title?: string;
	breakpoint_width: number;
}

export const Layout: FunctionComponent<Props> = props => {
	// process can't be destructured as Webpack replaces
	// the string using the DefinePlugin
	const site_title = process.env.site_title;
	const site_description = process.env.site_description;
	const { page_title, breakpoint_width } = props;
	const title = page_title ? `${site_title} | ${page_title}` : site_title;

	// TODO: Complete meta tags

	return (
		<ContextProvider breakpoint_width={breakpoint_width}>
			<Head>
				<title>{title}</title>
				<meta property="description" content={site_description} />
				<meta property="og:title" content={title} />
			</Head>

			{props.children}
		</ContextProvider>
	);
};
