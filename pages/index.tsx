import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";

import { Main } from "@/Main";
import { Page } from "@/Page";
import { Content } from "@/Content";
import { getEntries } from "@utils";

interface Props {
	file_path: Entry["file_path"];
	pages: Entry[];
	projects: Entry[];
}

const Home: FunctionComponent<Props> = props => {
	const { file_path, pages, projects } = props;

	return (
		<Page
			slug="home"
			file_path={file_path}
			is_page={true}
			pages={pages}
			projects={projects}
		>
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
	const entry = pages.find(entry => entry.slug === "home");

	return {
		props: {
			file_path: entry?.file_path || "",
			pages,
			projects,
		},
	};
};
