import React, { FunctionComponent, useContext } from "react";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

import { Column } from "@/Column";
import { Header } from "@/Header";
import { List } from "@/List";
import { Context } from "@context";
import styles from "./Page.styl";

interface Props {
	path: Entry["path"];
	slug: Entry["slug"];
	frontmatter: Entry["frontmatter"];
	frontmatter_mobile: Entry["frontmatter"] | null;
	projects: Entry[];
	pages: Entry[];
}

interface Components extends Record<"Column" | "Header", FunctionComponent> {
	List: FunctionComponent<{ type: ("projects" | "pages")[] }>;
}

export const Page: FunctionComponent<Props> = props => {
	const {
		path,
		slug,
		frontmatter,
		frontmatter_mobile,
		projects,
		pages,
	} = props;

	const { is_mobile } = useContext(Context);

	const has_mobile_content = !!frontmatter_mobile;

	const Content = dynamic(async () =>
		import(`${process.env.pages_dir}/${slug}.md`)
	);

	const ContentMobile = has_mobile_content
		? dynamic(() => import(`${process.env.pages_dir}/${slug}.mobile.md`))
		: null;

	const components: Components = {
		Column,

		// eslint-disable-next-line react/display-name
		Header: () => (
			<Header
				{...(is_mobile && frontmatter_mobile
					? frontmatter_mobile
					: frontmatter)}
				href={path}
			/>
		),

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
			{is_mobile && ContentMobile ? <ContentMobile /> : <Content />}
		</MDXProvider>
	);
};
