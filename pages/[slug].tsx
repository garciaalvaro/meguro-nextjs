import React, { useRef, useMemo } from "react";
import type { FunctionComponent } from "react";
import type { GetStaticProps, GetStaticPaths } from "next";

import { Main } from "@components/Main";
import { Page } from "@components/Page";
import { Content } from "@components/Content";
import { Sidebar } from "@components/Sidebar";
import { NextPage } from "@components/NextPage";
import { getPages } from "@utils";

interface Props {
	slug: Page["slug"];
	pages: Page[];
}

const Single: FunctionComponent<Props> = props => {
	const { slug } = props;

	const pages = useRef(props.pages).current;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const page = useMemo(() => pages.find(page => page.slug === slug), [slug]);

	if (!page) {
		return null;
	}

	return (
		<Page
			slug={slug}
			page_title={page.frontmatter.title}
			file_path={page.file_path}
			pages={pages}
		>
			<Main>
				<Content layout={page?.frontmatter.layout || ""} />
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

	return {
		props: { pages, slug },
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
