import React, { FunctionComponent } from "react";
import { GetStaticProps } from "next";
import { existsSync } from "fs";

import { Layout } from "@/Layout";
import { Page } from "@/Page";
import { getEntries } from "@utils";

interface Props {
	path: Entry["path"];
	slug: Entry["slug"];
	frontmatter: Entry["frontmatter"];
	frontmatter_mobile: Entry["frontmatter"] | null;
	projects: Entry[];
	pages: Entry[];
}

const Home: FunctionComponent<Props> = props => {
	const {
		path,
		slug,
		frontmatter,
		frontmatter_mobile,
		projects,
		pages,
	} = props;

	return (
		<Layout>
			<Page
				path={path}
				slug={slug}
				frontmatter={frontmatter}
				frontmatter_mobile={frontmatter_mobile}
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
	const projects = getEntries(process.env.projects_dir);
	const pages = getEntries(process.env.pages_dir);
	const { frontmatter } = await import(`${process.env.pages_dir}/${slug}.md`);
	let frontmatter_mobile: null | Entry["frontmatter"] = null;

	const has_mobile_content = await existsSync(
		`${process.env.pages_dir}/${slug}.mobile.md`
	);

	if (has_mobile_content) {
		const mobile = await import(
			`${process.env.pages_dir}/${slug}.mobile.md`
		);

		frontmatter_mobile = mobile.frontmatter;
	}

	return {
		props: { frontmatter_mobile, path, slug, frontmatter, projects, pages },
	};
};
