import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";

import { Main } from "@/Main";
import { Page } from "@/Page";
import { Content } from "@/Content";
import { getPages } from "@utils";

interface Props {
	file_path: Page["file_path"];
	pages: Page[];
}

const Home: FunctionComponent<Props> = props => {
	const { file_path, pages } = props;

	return (
		<Page slug="home" file_path={file_path} pages={pages}>
			<Main is_home={true}>
				<Content />
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
			pages,
		},
	};
};
