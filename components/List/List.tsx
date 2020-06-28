import React, { FunctionComponent } from "react";
import Link from "next/link";

import styles from "./List.styl";

interface Props {
	entries: Entry[];
	className: string;
}

export const List: FunctionComponent<Props> = props => {
	const { entries, children, className } = props;

	return (
		<ul className={className}>
			{children}

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
