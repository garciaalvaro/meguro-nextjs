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
	frontmatter_mobile: Entry["frontmatter_mobile"];
}

const Home: FunctionComponent<Props> = props => {
	const {
		slug,
		has_mobile_content,
		projects,
		pages,
		frontmatter_mobile,
	} = props;

	return (
		<Layout breakpoint_width={frontmatter_mobile.breakpoint_width || 600}>
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
	const { frontmatter_mobile } = pages.find(page => page.slug === slug);

	return {
		props: {
			slug,
			has_mobile_content,
			frontmatter_mobile: frontmatter_mobile as Entry["frontmatter"],
			projects,
			pages,
		},
	};
};
