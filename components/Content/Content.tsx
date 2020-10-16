import React, { FunctionComponent } from "react";
import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";

import { ProjectsList } from "@/ProjectsList";
import { Image } from "@/Image";
import { Column } from "@/Column";
import { Info } from "@/Info";
import { ContentEntry } from "./ContentEntry";

const components: MDXProviderComponents = {
	Column,
	Info,
	ProjectsList,

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
