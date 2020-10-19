import React, { Fragment, FunctionComponent } from "react";
import Head from "next/head";

import { ContextProvider } from "@context";
import "./Page.styl";

interface Props {
	page_title?: string;
	slug: Entry["slug"];
	is_page: Entry["is_page"];
	pages: Entry[];
	projects: Entry[];
}

export const Page: FunctionComponent<Props> = props => {
	// process can't be destructured as Webpack replaces
	// the string using the DefinePlugin.
	const site_title = process.env.site_title;
	const site_description = process.env.site_description;
	const font_family_url = process.env.font_family_url;
	const body_font_family = process.env.body_font_family;
	const titles_font_family = process.env.titles_font_family;
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

				{font_family_url && (
					<Fragment>
						<link
							key="font_family_link"
							href={font_family_url}
							rel="stylesheet"
						></link>

						<style key="font_family_style">
							{[
								`body{font-family:${body_font_family}}`,
								`h1,h2,h3,h4,h5{font-family:${titles_font_family}}`,
							].join("")}
						</style>
					</Fragment>
				)}
			</Head>

			{props.children}
		</ContextProvider>
	);
};
