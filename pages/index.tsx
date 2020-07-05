import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";

import { Layout } from "@/Layout";
import { Page } from "@/Page";
import { getEntries } from "@utils";

interface Props {
	path: Entry["path"];
	slug: Entry["slug"];
	frontmatter: Entry["frontmatter"];
	projects: Entry[];
	pages: Entry[];
}

const Home: FunctionComponent<Props> = props => {
	const { path, slug, frontmatter, projects, pages } = props;

	return (
		<Layout>
			<Page
				path={path}
				slug={slug}
				frontmatter={frontmatter}
				projects={projects}
				pages={pages}
			/>
		</Layout>
	);
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
	const path = "/";
	const slug = "home";
	const { frontmatter } = await import(`${process.env.pages_dir}/${slug}.md`);
	const projects = getEntries(process.env.projects_dir);
	const pages = getEntries(process.env.pages_dir);

	return {
		props: { path, slug, frontmatter, projects, pages },
	};
};
