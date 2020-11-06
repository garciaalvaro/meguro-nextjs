import React, { FunctionComponent, useRef, useContext } from "react";

import { Context } from "@context";
import { ListItem } from "../ListItem";
import styles from "./List.styl";

interface Props {
	sidebar_is_open: boolean;
}

export const List: FunctionComponent<Props> = props => {
	const background_color = process.env.sidebar_background_color || "";

	const { pages, projects } = useContext(Context);

	const { current: entries } = useRef(
		[...pages, ...projects].sort(a => {
			if (a.url_path === "/") {
				return -1;
			}

			return 0;
		})
	);

	return (
		<ul
			className={styles.container}
			style={{ backgroundColor: background_color }}
		>
			{entries.map(({ url_path, frontmatter }) => (
				<ListItem
					key={url_path}
					sidebar_is_open={props.sidebar_is_open}
					url_path={url_path}
					frontmatter={frontmatter}
					background_color={background_color}
				/>
			))}
		</ul>
	);
};
