import React, { useEffect, useState, useContext } from "react";
import type { FunctionComponent } from "react";
import { MDXProvider } from "@mdx-js/react";
import type { MDXProviderComponents } from "@mdx-js/react";

import { layouts } from "@layouts";
import {
	PagesList,
	ImageImported,
	Column,
	Columns,
	Info,
	Slider,
	Container,
} from "../utils";
import { ContentEntryServerSide } from "./ContentEntryServerSide";
import { ContentEntry } from "./ContentEntry";
import { Context } from "@context";
import { useIsFirstRender } from "@hooks";

interface Props {
	layout: Page["frontmatter"]["layout"];
}

const components_default: MDXProviderComponents = {
	Slider,
	Container,
	Column,
	Columns,
	Info,
	PagesList,

	// eslint-disable-next-line react/display-name
	img: props => <ImageImported {...props} />,

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

const getComponents = (layout_name: string) => {
	const layout = layouts[layout_name] as Layout | undefined;

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
		img: props => <ImageImported {...props} sizes={image_sizes} />,
	};

	return components;
};

export const Content: FunctionComponent<Props> = props => {
	const { layout } = props;

	const is_first_render = useIsFirstRender();
	const { md_is_loading } = useContext(Context);

	const [components, setComponents] = useState<MDXProviderComponents>(
		getComponents(layout)
	);

	useEffect(() => {
		setComponents(components => ({
			...getComponents(layout),
			...components,
		}));
	}, [layout]);

	useEffect(() => {
		if (md_is_loading) return;

		setComponents(getComponents(layout));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [md_is_loading]);

	return (
		<MDXProvider components={components}>
			{is_first_render ? <ContentEntryServerSide /> : <ContentEntry />}
		</MDXProvider>
	);
};
