import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";

import { Main } from "@/Main";
import { Page } from "@/Page";
import { Content } from "@/Content";
import { getEntries } from "@utils";

interface Props {
	layout_name: Layout["name"];
	projects: Entry[];
	pages: Entry[];
}

const Home: FunctionComponent<Props> = props => {
	const { layout_name, projects, pages } = props;

	return (
		<Page>
			<Main>
				<Content
					slug="home"
					is_page={true}
					layout_name={layout_name}
					projects={projects}
					pages={pages}
				/>
			</Main>
		</Page>
	);
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
	const slug = "home";
	const projects = getEntries(process.env.projects_dir);
	const pages = getEntries(process.env.pages_dir);
	const entry = [...pages, ...projects].find(entry => entry.slug === slug);

	return {
		props: {
			layout_name: entry?.frontmatter.layout || "meguro_4",
			projects,
			pages,
		},
	};
};
