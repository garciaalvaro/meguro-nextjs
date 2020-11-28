import React, { Fragment, FunctionComponent, useRef } from "react";
import Head from "next/head";

import { ContextProvider } from "@context";
import "./Page.styl";

// If there are custom styles import them
if (process.env.custom_css_file) {
	require(process.env.custom_css_file);
}

interface Props {
	page_title?: string;
	slug: Page["slug"];
	file_path: Page["file_path"];
	pages: Page[];
}

export const Page: FunctionComponent<Props> = props => {
	// process can't be destructured as Webpack replaces
	// the string using the DefinePlugin.
	const site_title = process.env.site_title;
	const site_description = process.env.site_description;
	const font_family_url = process.env.font_family_url;
	const { file_path, page_title, slug, pages } = props;
	const title = page_title ? `${site_title} | ${page_title}` : site_title;

	const { current: favicon_src } = useRef<string>(
		(() => {
			const {
				src,
			}: { src: string } = require("@content/assets/favicon.png");

			return src;
		})()
	);

	// TODO: Complete meta tags

	return (
		<ContextProvider slug={slug} file_path={file_path} pages={pages}>
			<Head>
				<title>{title}</title>
				<meta property="description" content={site_description} />
				<meta property="og:title" content={title} />
				<link rel="icon" href={favicon_src}></link>

				{font_family_url && (
					<Fragment>
						<link
							key="font_family_link"
							href={font_family_url}
							rel="stylesheet"
						></link>
					</Fragment>
				)}
			</Head>

			{props.children}
		</ContextProvider>
	);
};
