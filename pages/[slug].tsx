import React, { FunctionComponent } from "react";
import { GetStaticProps, GetStaticPaths } from "next";

import { Main } from "@/Main";
import { Page } from "@/Page";
import { Content } from "@/Content";
import { Sidebar } from "@/Sidebar";
import { getEntries } from "@utils";

interface Props {
	slug: Entry["slug"];
	is_page: Entry["is_page"];
	projects: Entry[];
	pages: Entry[];
}

const Single: FunctionComponent<Props> = props => {
	const { slug, is_page, projects, pages } = props;

	return (
		<Page slug={slug} is_page={is_page} pages={pages} projects={projects}>
			<Main>
				<Content />
			</Main>

			<Sidebar />
		</Page>
	);
};

export default Single;

export const getStaticProps: GetStaticProps<Props> = async context => {
	const slug = context.params?.slug as string;

	const projects = process.env.projects_dir
		? getEntries(process.env.projects_dir)
		: [];

	const pages = process.env.pages_dir
		? getEntries(process.env.pages_dir)
		: [];

	let entry = pages.find(entry => entry.slug === slug);

	const is_page = !!entry;

	entry = entry || projects.find(entry => entry.slug === slug);

	return {
		props: {
			slug: entry?.slug || "",
			is_page,
			projects,
			pages,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const projects = getEntries(process.env.projects_dir);
	const pages = getEntries(process.env.pages_dir);

	const paths = [...projects, ...pages].reduce<string[]>(
		(acc, { path }) => (path === "/" ? acc : [...acc, path]),
		[]
	);

	return {
		paths,
		fallback: false,
	};
};
