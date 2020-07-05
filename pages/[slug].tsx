import React, { FunctionComponent } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { existsSync } from "fs";

import { Layout } from "@/Layout";
import { Page } from "@/Page";
import { getEntries } from "@utils";

interface Props {
	entry_type: EntryType;
	path: Entry["path"];
	slug: Entry["slug"];
	frontmatter: Entry["frontmatter"];
	frontmatter_mobile: Entry["frontmatter"] | null;
	projects: Entry[];
	pages: Entry[];
}

const Home: FunctionComponent<Props> = props => {
	const {
		entry_type,
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
				entry_type={entry_type}
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

export const getStaticProps: GetStaticProps<Props> = async context => {
	const slug = context.params?.slug;
	const path = `/${slug}`;
	const projects = getEntries(process.env.projects_dir);
	const pages = getEntries(process.env.pages_dir);
	let frontmatter_mobile = null;
	let entry = pages.find(entry => entry.slug === slug);
	const entry_type = entry ? "page" : "project";
	entry = projects.find(entry => entry.slug === slug) as Entry;

	if (entry_type === "page") {
		const has_mobile_content = await existsSync(
			`${process.env.pages_dir}/${slug}.mobile.md`
		);

		if (has_mobile_content) {
			const mobile = await import(
				`${process.env.pages_dir}/${slug}.mobile.md`
			);

			frontmatter_mobile = mobile.frontmatter;
		}
	} else {
		const has_mobile_content = await existsSync(
			`${process.env.projects_dir}/${slug}.mobile.md`
		);

		if (has_mobile_content) {
			const mobile = await import(
				`${process.env.projects_dir}/${slug}.mobile.md`
			);

			frontmatter_mobile = mobile.frontmatter;
		}
	}

	return {
		props: {
			entry_type,
			path,
			slug,
			frontmatter: entry.frontmatter,
			frontmatter_mobile,
			projects,
			pages,
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
