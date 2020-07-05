import React, { FunctionComponent } from "react";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

import { Column } from "@/Column";
import { Header } from "@/Header";
import { List } from "@/List";
import { useWindowSize } from "@utils";
import styles from "./Page.styl";

interface Props {
	path: Entry["path"];
	slug: Entry["slug"];
	frontmatter: Entry["frontmatter"];
	projects: Entry[];
	pages: Entry[];
}

interface Components extends Record<"Column" | "Header", FunctionComponent> {
	List: FunctionComponent<{ type: ("projects" | "pages")[] }>;
}

export const Page: FunctionComponent<Props> = props => {
	const { path, slug, frontmatter, projects, pages } = props;

	const { window_width } = useWindowSize();

	const Content = dynamic(async () =>
		import(`${process.env.pages_dir}/${slug}.md`)
	);

	const ContentMobile = dynamic(async () =>
		import(`${process.env.pages_dir}/${slug}.mobile.md`)
	);

	const components: Components = {
		Column,

		// eslint-disable-next-line react/display-name
		Header: () => <Header {...frontmatter} href={path} />,

		// eslint-disable-next-line react/display-name
		List: ({ type }) => (
			<List
				entries={[
					...(type.indexOf("pages") === 0 ? pages : []),
					...(type.includes("projects") ? projects : []),
					...(type.indexOf("pages") > 0 ? pages : []),
				]}
			></List>
		),
	};

	return (
		<MDXProvider className={styles.container} components={components}>
			{window_width > 600 ? <Content /> : <ContentMobile />}
		</MDXProvider>
	);
};
