import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";

import { Layout } from "@/Layout";
import { Home } from "@/Home";
import { getEntries } from "@utils";

interface Props {
	slug: Entry["slug"];
	frontmatter: Entry["frontmatter"];
	projects: Entry[];
}

const Page: FunctionComponent<Props> = props => {
	const { projects, slug } = props;

	return (
		<Layout>
			<Home slug={slug} projects={projects} />
		</Layout>
	);
};

export default Page;

export const getStaticProps: GetStaticProps<Props> = async () => {
	const slug = "home";
	const { frontmatter } = await import(`${process.env.pages_dir}/${slug}.md`);
	const projects = getEntries(process.env.projects_dir);

	return {
		props: { slug, frontmatter, projects },
	};
};
