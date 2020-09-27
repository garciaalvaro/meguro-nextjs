import React, { FunctionComponent, useState, useEffect, useRef } from "react";
import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";
import dynamic from "next/dynamic";

import { List } from "@/List";
import { Container } from "@/Container";
import { Column } from "@/Column";
import { Props as StylesProps } from "@utils/useStyles";
import { useIsFirstRender, useIsMobile } from "@utils";
import { layouts } from "@layouts";

interface Props {
	is_page: Entry["is_page"];
	slug: Entry["slug"];
	layout_name: Layout["name"];
	projects: Entry[];
	pages: Entry[];
}

export const Content: FunctionComponent<Props> = props => {
	const { is_page, slug, layout_name, projects, pages } = props;

	const { current: Entry } = useRef(
		is_page
			? dynamic(async () => import(`${process.env.pages_dir}/${slug}.md`))
			: dynamic(
					async () => import(`${process.env.projects_dir}/${slug}.md`)
			  )
	);

	const { current: layout } = useRef(
		layouts.find(({ name }) => name === layout_name) || layouts[0]
	);

	const is_mobile = useIsMobile(layout.breakpoint);

	const is_first_render = useIsFirstRender();

	const components = useRef<MDXProviderComponents>({
		Container,

		// eslint-disable-next-line react/display-name
		Column,

		// eslint-disable-next-line react/display-name
		Info: (props: StylesProps) => <Container {...props} type="info" />,

		// eslint-disable-next-line react/display-name
		Hr: (props: StylesProps) => (
			<Container
				{...props}
				border={undefined}
				border_top={props.border}
				html_tag="hr"
			/>
		),

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

	const [layout_components, setLayoutComponents] = useState<
		MDXProviderComponents
	>(is_mobile ? layout.components_mobile : layout.components_desktop);

	useEffect(() => {
		setLayoutComponents(
			is_mobile ? layout.components_mobile : layout.components_desktop
		);
	}, [is_mobile]);

	return (
		<MDXProvider
			components={{ ...components.current, ...layout_components }}
		>
			{is_mobile && !is_first_render ? (
				<Column>
					<Entry />
				</Column>
			) : (
				<Entry />
			)}
		</MDXProvider>
	);
};
