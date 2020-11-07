import React, { FunctionComponent } from "react";
import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";

import { PagesList } from "@/PagesList";
import { Image } from "@/Image";
import { Column } from "@/Column";
import { Columns } from "@/Columns";
import { Info } from "@/Info";
import { ContentEntry } from "./ContentEntry";

const components: MDXProviderComponents = {
	Column,
	Columns,
	Info,
	PagesList,

	// eslint-disable-next-line react/display-name
	img: props => <Image {...props} />,
};

export const Content: FunctionComponent = () => {
	return (
		<MDXProvider components={components}>
			<ContentEntry />
		</MDXProvider>
	);
};
