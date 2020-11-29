import React, { FunctionComponent, useRef } from "react";
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
	const site_author = process.env.site_author;
	const font_family_url = process.env.font_family_url;
	const { file_path, page_title, slug, pages } = props;
	const title = page_title ? `${site_title} | ${page_title}` : site_title;

	const { current: site_logo } = useRef<string>(
		(() => {
			if (!process.env.site_logo) {
				return "";
			}

			const { src }: Record<string, string> = require("@content/" +
				process.env.site_logo.replace(/^\//, ""));

			return src;
		})()
	);

	const { current: site_favicon } = useRef<string>(
		(() => {
			if (!process.env.site_favicon) {
				return "";
			}

			const { src }: Record<string, string> = require("@content/" +
				process.env.site_favicon.replace(/^\//, ""));

			return src;
		})()
	);

	return (
		<ContextProvider slug={slug} file_path={file_path} pages={pages}>
			<Head>
				<title>{title}</title>
				<meta name="description" content={site_description} />
				<meta property="og:title" content={title} />
				<meta property="og:description" content={site_description} />
				<meta property="og:type" content="website" />
				{/* TODO <meta property="og:url" content={window.location.href} /> */}
				{site_logo && (
					<meta property="og:image:secure_url" content={site_logo} />
				)}
				<meta property="twitter:card" content="summary" />
				{site_author && (
					<meta property="twitter:creator" content={site_author} />
				)}
				<meta property="twitter:title" content={title} />
				<meta
					property="twitter:description"
					content={site_description}
				/>
				<link rel="icon" href={site_favicon}></link>

				{font_family_url && (
					<link
						key="font_family_link"
						href={font_family_url}
						rel="stylesheet"
					></link>
				)}
			</Head>

			{props.children}
		</ContextProvider>
	);
};
