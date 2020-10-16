import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";

import { Main } from "@/Main";
import { Page } from "@/Page";
import { Content } from "@/Content";
import { getEntries } from "@utils";

interface Props {
	pages: Entry[];
	projects: Entry[];
}

const Home: FunctionComponent<Props> = props => {
	const { pages, projects } = props;

	return (
		<Page slug="home" is_page={true} pages={pages} projects={projects}>
			<Main is_home={true}>
				<Content />
			</Main>
		</Page>
	);
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
	const pages = getEntries(process.env.pages_dir);
	const projects = getEntries(process.env.projects_dir);

	return {
		props: {
			pages,
			projects,
		},
	};
};
