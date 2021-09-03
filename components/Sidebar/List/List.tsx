import React from "react";
import type { RefObject, FunctionComponent } from "react";
import type { Scrollbar } from "react-scrollbars-custom";

import { usePages } from "@hooks";
import { ListItem } from "../list-item";
import styles from "./List.module.sass";

interface Props {
	$scroller?: RefObject<Scrollbar | null>;
}

export const List: FunctionComponent<Props> = props => {
	const pages_sorted = usePages(process.env.sidebar_menu_pages);

	return (
		<ul className={styles.container}>
			{pages_sorted.map(({ url_path, frontmatter }) => (
				<ListItem
					key={url_path}
					url_path={url_path}
					frontmatter={frontmatter}
					$scroller={props.$scroller}
				/>
			))}
		</ul>
	);
};
