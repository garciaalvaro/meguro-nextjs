import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";
import { existsSync } from "fs";

import { Main } from "@/Main";
import { Layout } from "@/Layout";
import { Content } from "@/Content";
import { getEntries } from "@utils";

interface Props {
	slug: Entry["slug"];
	has_mobile_content: boolean;
	projects: Entry[];
	pages: Entry[];
}

const Home: FunctionComponent<Props> = props => {
	const { slug, has_mobile_content, projects, pages } = props;

	return (
		<Layout>
			<Main>
				<Content
					entry_type="page"
					slug={slug}
					has_mobile_content={has_mobile_content}
					projects={projects}
					pages={pages}
				/>
			</Main>
		</Layout>
	);
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
	const slug = "home";
	const projects = getEntries(process.env.projects_dir);
	const pages = getEntries(process.env.pages_dir);
	const file_path_mobile = `${process.env.pages_dir}/${slug}/index.mobile.md`;
	const has_mobile_content = await existsSync(file_path_mobile);

	return {
		props: {
			slug,
			has_mobile_content,
			projects,
			pages,
		},
	};
};
