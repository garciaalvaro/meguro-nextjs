import React, {
	FunctionComponent,
	useState,
	useContext,
	useEffect,
	useRef,
} from "react";
import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";
import dynamic from "next/dynamic";

import { List } from "@/List";
import { Container } from "@/Container";
import { Column } from "@/Column";
import { Props as StylesProps } from "@utils/useStyles";
import { Context } from "@context";
import { useIsFirstRender } from "@utils";

interface Props {
	entry_type: EntryType;
	slug: Entry["slug"];
	has_mobile_content: boolean;
	projects: Entry[];
	pages: Entry[];
}

export const Content: FunctionComponent<Props> = props => {
	const { entry_type, slug, has_mobile_content, projects, pages } = props;

	const is_first_render = useIsFirstRender();

	const { is_mobile, layout } = useContext(Context);

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

	const [layouts, setLayouts] = useState<MDXProviderComponents>(
		is_mobile ? layout.components_mobile : layout.components_desktop
	);

	useEffect(() => {
		setLayouts(
			is_mobile ? layout.components_mobile : layout.components_desktop
		);
	}, [is_mobile]);

	const Content =
		is_mobile && ContentMobile.current
			? ContentMobile.current
			: ContentDesktop.current;

	return (
		<MDXProvider components={{ ...components.current, ...layouts }}>
			{is_mobile && !is_first_render ? (
				<Column>
					<Content />
				</Column>
			) : (
				<Content />
			)}
		</MDXProvider>
	);
};
