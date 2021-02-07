import React, { FunctionComponent } from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import { Main } from "@/Main";
import { Page } from "@/Page";
import { Content } from "@/Content";
import { Sidebar } from "@/Sidebar";
import { NextPage } from "@/NextPage";
import { getPages } from "./utils";

interface Props {
	layout: Page["frontmatter"]["layout"];
	slug: Page["slug"];
	file_path: Page["file_path"];
	pages: Page[];
}

const Single: FunctionComponent<Props> = props => {
	const { layout, slug, file_path, pages } = props;

	return (
		<Page slug={slug} file_path={file_path} pages={pages}>
			<Main>
				<Content layout={layout} />
			</Main>

			<Sidebar />

			<NextPage />
		</Page>
	);
};

export default Single;

export const getStaticProps: GetStaticProps<Props> = async context => {
	const slug = context.params?.slug as string;
	const pages = getPages(process.env.pages_dir);
	const page = pages.find(page => page.slug === slug);

	return {
		props: {
			slug: page?.slug || "",
			file_path: page?.file_path || "",
			layout: page?.frontmatter.layout || "",
			pages,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const pages = getPages(process.env.pages_dir);

	const url_paths = pages.reduce<string[]>(
		(acc, { url_path }) => (url_path === "/" ? acc : [...acc, url_path]),
		[]
	);

	return {
		paths: url_paths,
		fallback: false,
	};
};
