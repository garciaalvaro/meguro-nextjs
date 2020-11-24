import React, { FunctionComponent, useRef } from "react";
import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";

import { layouts } from "@layouts";
import { PagesList } from "@/PagesList";
import { Image } from "@/Image";
import { Column } from "@/Column";
import { Columns } from "@/Columns";
import { Info } from "@/Info";
import { ContentEntry } from "./ContentEntry";

interface Props {
	layout: Page["frontmatter"]["layout"];
}

const components_default: MDXProviderComponents = {
	Column,
	Columns,
	Info,
	PagesList,

	// eslint-disable-next-line react/display-name
	img: props => <Image {...props} />,

	// eslint-disable-next-line react/display-name
	a: props => (
		<a
			{...props}
			{...(process.env.open_external_links_in_new_tab &&
			/^http/.test(props?.href)
				? {
						target: "_blank",
						rel: "noreferrer noopener",
				  }
				: {})}
		/>
	),
};

export const Content: FunctionComponent<Props> = props => {
	// TODO: This implementation fails when the page is loading
	// to a new one.
	const { current: components } = useRef<MDXProviderComponents>(
		(() => {
			const layout = layouts[props.layout] as Layout | undefined;

			if (!layout) {
				return components_default;
			}

			const {
				breakpoint,
				number_of_columns,
				components: components_custom,
			} = layout;

			const image_sizes = `(min-width: ${breakpoint}px) ${
				100 / number_of_columns
			}vw, 100vw`;

			const components: MDXProviderComponents = {
				...components_default,
				...components_custom,

				// eslint-disable-next-line react/display-name
				img: props => <Image {...props} sizes={image_sizes} />,
			};

			return components;
		})()
	);

	return (
		<MDXProvider components={components}>
			<ContentEntry />
		</MDXProvider>
	);
};
