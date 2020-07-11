import React, { FunctionComponent } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { existsSync } from "fs";

import { Main } from "@/Main";
import { Layout } from "@/Layout";
import { Content } from "@/Content";
import { Sidebar } from "@/Sidebar";
import { getEntries } from "@utils";

interface Props {
	entry_type: EntryType;
	slug: Entry["slug"];
	has_mobile_content: boolean;
	projects: Entry[];
	pages: Entry[];
}

const Page: FunctionComponent<Props> = props => {
	const { entry_type, slug, has_mobile_content, projects, pages } = props;

	return (
		<Layout>
			<Main>
				<Content
					entry_type={entry_type}
					slug={slug}
					has_mobile_content={has_mobile_content}
					projects={projects}
					pages={pages}
				/>
			</Main>

			<Sidebar entries={[...pages, ...projects]} />
		</Layout>
	);
};

export default Page;

export const getStaticProps: GetStaticProps<Props> = async context => {
	const slug = context.params?.slug as string;
	const projects = getEntries(process.env.projects_dir);
	const pages = getEntries(process.env.pages_dir);
	let has_mobile_content = false;
	const entry_type = pages.find(entry => entry.slug === slug)
		? "page"
		: "project";

	if (entry_type === "page") {
		has_mobile_content = await existsSync(
			`${process.env.pages_dir}/${slug}/index.mobile.md`
		);
	} else {
		has_mobile_content = await existsSync(
			`${process.env.projects_dir}/${slug}/index.mobile.md`
		);
	}

	return {
		props: {
			entry_type,
			slug,
			has_mobile_content,
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
