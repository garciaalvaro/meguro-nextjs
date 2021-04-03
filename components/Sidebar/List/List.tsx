import React from "react";
import type { FunctionComponent } from "react";

import { usePages } from "@hooks";
import { ListItem } from "../ListItem";
import styles from "./List.styl";

export const List: FunctionComponent = () => {
	const pages_sorted = usePages(process.env.sidebar_menu_pages);

	return (
		<ul className={styles.container}>
			{pages_sorted.map(({ url_path, frontmatter }) => (
				<ListItem
					key={url_path}
					url_path={url_path}
					frontmatter={frontmatter}
				/>
			))}
		</ul>
	);
};
