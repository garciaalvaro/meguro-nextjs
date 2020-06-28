import React, { FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import { GetStaticProps } from "next";

import { Header } from "@/Header";
import { Column } from "@/Column";
import { Layout } from "@/Layout";
import { Content } from "@/Content";
import { List } from "@/List";
import { Main } from "@/Main";
import { getEntries } from "@utils";

interface Props {
	projects: Entry[];
	content: Entry["content"];
}

const Home: FunctionComponent<Props> = props => {
	const { content, projects } = props;

	return (
		<Layout>
			<Main>
				<Column>
					<Header
						title={process.env.site_title}
						subtitle={process.env.site_description}
						href="/"
					/>

					<Content>
						<ReactMarkdown source={content} escapeHtml={false} />
					</Content>
				</Column>

				<Column>
					<List entries={projects}></List>
				</Column>
			</Main>
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
