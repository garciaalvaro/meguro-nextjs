import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { GetStaticProps } from "next";

import { Layout } from "@/Layout";
import { List } from "@/List";
import { getEntries } from "@utils";

interface Props {
	projects: Entry[];
	content: Entry["content"];
}

const Home: FunctionComponent<Props> = props => {
	const { content, projects } = props;

	return (
		<Layout>
			<ReactMarkdown source={content} escapeHtml={false} />

			<List entries={projects}></List>
		</Layout>
	);
};

export default Home;

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
