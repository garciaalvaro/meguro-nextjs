import React, { FunctionComponent } from "react";

import { usePages } from "@utils";
import { ListItem } from "../ListItem";
import styles from "./List.styl";

export const List: FunctionComponent = () => {
	const background_color = process.env.sidebar_background_color;
	const pages_sorted = usePages(process.env.sidebar_menu_pages);

	return (
		<ul
			className={styles.container}
			style={{ backgroundColor: background_color }}
		>
			{pages_sorted.map(({ url_path, frontmatter }) => (
				<ListItem
					key={url_path}
					url_path={url_path}
					frontmatter={frontmatter}
					background_color={background_color}
				/>
			))}
		</ul>
	);
};
