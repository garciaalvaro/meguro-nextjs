import React from "react";
import type { FunctionComponent } from "react";
import type { GetStaticProps } from "next";

import { Main } from "@components/Main";
import { Page } from "@components/Page";
import { Content } from "@components/Content";
import { getPages } from "@utils";

interface Props {
	layout: Page["frontmatter"]["layout"];
	file_path: Page["file_path"];
	pages: Page[];
}

const Home: FunctionComponent<Props> = props => {
	const { layout, file_path, pages } = props;

	return (
		<Page slug="home" file_path={file_path} pages={pages}>
			<Main is_home={true}>
				<Content layout={layout} />
			</Main>
		</Page>
	);
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
	const pages = getPages(process.env.pages_dir);
	const page = pages.find(page => page.slug === "home");

	return {
		props: {
			file_path: page?.file_path || "",
			layout: page?.frontmatter.layout || "",
			pages,
		},
	};
};
