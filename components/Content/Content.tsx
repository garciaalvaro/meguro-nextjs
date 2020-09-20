import React, { FunctionComponent, useContext } from "react";
import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";
import dynamic from "next/dynamic";

import { List } from "@/List";
import { Container } from "@/Container";
import { Column } from "@/Column";
import { Props as StylesProps } from "@utils/useStyles";
import { Context } from "@context";

interface Props {
	entry_type: EntryType;
	slug: Entry["slug"];
	has_mobile_content: boolean;
	projects: Entry[];
	pages: Entry[];
}

export const Content: FunctionComponent<Props> = props => {
	const { entry_type, slug, has_mobile_content, projects, pages } = props;

	const { is_mobile } = useContext(Context);

	const ContentDesktop = React.useRef<React.ComponentType>(
		(() => {
			if (entry_type === "page") {
				return dynamic(async () =>
					import(`${process.env.pages_dir}/${slug}/index.md`)
				);
			}

			return dynamic(async () =>
				import(`${process.env.projects_dir}/${slug}/index.md`)
			);
		})()
	);

	const ContentMobile = React.useRef<React.ComponentType>(
		(() => {
			if (!has_mobile_content) {
				return null;
			}

			if (entry_type === "page") {
				return dynamic(() =>
					import(`${process.env.pages_dir}/${slug}/index.mobile.md`)
				);
			}

			return dynamic(() =>
				import(`${process.env.projects_dir}/${slug}/index.mobile.md`)
			);
		})()
	);

	const components = React.useRef<MDXProviderComponents>({
		Container,

		// eslint-disable-next-line react/display-name
		Column,

		// eslint-disable-next-line react/display-name
		Info: (props: StylesProps) => <Container {...props} type="info" />,

		// eslint-disable-next-line react/display-name
		Hr: (props: StylesProps) => <Container {...props} html_tag="hr" />,

		// eslint-disable-next-line react/display-name
		List: ({
			type,
			...props
		}: StylesProps & { type: "projects" | "pages" }) => (
			<List
				{...props}
				entries={[
					...(type.indexOf("pages") === 0 ? pages : []),
					...(type.includes("projects") ? projects : []),
					...(type.indexOf("pages") > 0 ? pages : []),
				]}
			></List>
		),
	});

	const Content =
		is_mobile && ContentMobile.current
			? ContentMobile.current
			: ContentDesktop.current;

	return (
		<MDXProvider components={components.current}>
			<Content />
		</MDXProvider>
	);
};
