import React, { FunctionComponent } from "react";
import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

import { Column } from '@/Column'
import styles from "./Content.styl";

interface Props {
	slug: Entry["slug"];
}

export const Content: FunctionComponent<Props> = props => {
	const Content = dynamic(() =>
		import(`${process.env.pages_dir}/${props.slug}.md`)
	);

	return (
		<MDXProvider
			className={styles.container}
			components={{ Column }}
		>
			<Content />
		</MDXProvider>
	)
};
