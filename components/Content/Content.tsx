import React, { FunctionComponent, useContext } from "react";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

import { List } from "@/List";
import { Container, ContainerProps } from "@/Container";
import { Context } from "@context";

interface Props {
	entry_type: EntryType;
	slug: Entry["slug"];
	has_mobile_content: boolean;
	projects: Entry[];
	pages: Entry[];
}

interface Components {
	List: FunctionComponent<{ type: "projects" | "pages" }>;
	Container: FunctionComponent<ContainerProps>;
	Info: FunctionComponent<ContainerProps>;
	Column: FunctionComponent<ContainerProps>;
}

export const Content: FunctionComponent<Props> = props => {
	const {
		entry_type,
		slug,
		has_mobile_content,
		projects,
		pages,
	} = props;

	const { is_mobile } = useContext(Context);

	let Content = null;
	let ContentMobile = null;

	if (entry_type === "page") {
		Content = dynamic(async () =>
			import(`${process.env.pages_dir}/${slug}.md`)
		);

		if (has_mobile_content) {
			ContentMobile = dynamic(() =>
				import(`${process.env.pages_dir}/${slug}.mobile.md`)
			);
		}
	} else {
		Content = dynamic(async () =>
			import(`${process.env.projects_dir}/${slug}.md`)
		);

		if (has_mobile_content) {
			ContentMobile = dynamic(() =>
				import(`${process.env.projects_dir}/${slug}.mobile.md`)
			);
		}
	}

	const components: Components = {
		Container,

		// eslint-disable-next-line react/display-name
		Column: (props) => <Container {...props} type="column" />,

		// eslint-disable-next-line react/display-name
		Info: (props) => <Container {...props} type="info" />,

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
		<MDXProvider components={components}>
			{is_mobile && ContentMobile ? <ContentMobile /> : <Content />}
		</MDXProvider>
	);
};
