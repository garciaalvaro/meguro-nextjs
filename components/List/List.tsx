import React, { FunctionComponent, useRef } from "react";
import Link from "next/link";

import styles_component from "./List.styl";
import styles_utils from "@utils/styles.styl";

interface Props {
	entries: Entry[];
	row_separation?: number;
	column_separation?: number;
}

const styles = { ...styles_component, ...styles_utils };

export const List: FunctionComponent<Props> = props => {
	const { entries, row_separation, column_separation } = props;

	const classNames = useRef(
		[
			styles.container,
			styles[`row_separation-${row_separation}`],
			styles[`column_separation-${column_separation}`],
		]
			.filter(className => className)
			.join(" ")
	);

	return (
		<ul className={classNames.current}>
			{props.children}

			{entries.map(({ path, frontmatter }) => (
				<li key={path}>
					<Link href="/[slug]" as={path}>
						<a className={styles.link}>
							<div className={styles.image_container}>
								<img
									className={styles.image}
									src={frontmatter.thumb_img}
								/>
							</div>

							<h3>{frontmatter.title}</h3>
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
};
