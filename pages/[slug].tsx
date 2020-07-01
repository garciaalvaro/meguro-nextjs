import React, { FunctionComponent } from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import { Layout } from "@/Layout";
import { Sidebar } from "@/Sidebar";
import { Single } from "@/Single";
import { getEntries } from "@utils";

type Props = {
	projects: Entry[];
	pages: Entry[];
	frontmatter: Entry["frontmatter"];
	content: Entry["content"];
	slug: Entry["slug"];
};

const Page: FunctionComponent<Props> = props => {
	const { content, frontmatter, slug, projects, pages } = props;

	return (
		<Layout page_title={frontmatter.title}>
			{/* <Sidebar entries={[...pages, ...projects]} /> */}

			<Single content={content} frontmatter={frontmatter} slug={slug} />
		</Layout>
	);
};

export default Page;

export const getStaticProps: GetStaticProps<Props> = async context => {
	const { params } = context;

	const projects = getEntries(process.env.projects_dir);

	const pages = getEntries(process.env.pages_dir);

	const { content, frontmatter } = [...pages, ...projects].find(
		({ slug }) => slug === params?.slug
	) as Entry;

	return {
		props: {
			projects,
			pages: pages.filter(({ slug }) => slug !== "home"),
			content,
			frontmatter,
			slug: params?.slug,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const projects = getEntries(process.env.projects_dir);

	const pages = getEntries(process.env.pages_dir);

	return {
		paths: [...projects, ...pages].map(({ path }) => path),
		fallback: false,
	};
};
