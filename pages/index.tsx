import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";

import { Layout } from "@/Layout";
import { Home } from "@/Home";
import { getEntries } from "@utils";

interface Props {
	projects: Entry[];
	content: Entry["content"];
}

const Page: FunctionComponent<Props> = props => {
	const { content, projects } = props;

	return (
		<Layout>
			<Home content={content} projects={projects} />
		</Layout>
	);
};

export default Page;

export const getStaticProps: GetStaticProps<Props> = async () => {
	const projects = getEntries(process.env.projects_dir);

	const pages = getEntries(process.env.pages_dir);

	const { content } = pages.find(({ slug }) => slug === "home") as Entry;

	return {
		props: {
			projects,
			content,
		},
	};
};
