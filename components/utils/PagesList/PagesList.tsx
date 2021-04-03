import React from "react";
import type { FunctionComponent } from "react";
import Link from "next/link";

import { ImageImported } from "../ImageImported";
import { usePages } from "@hooks";
import styles from "./PagesList.styl";

interface Props {
	pages: Page["slug"][] | undefined;
}

export const PagesList: FunctionComponent<Props> = props => {
	const pages_sorted = usePages(props.pages || []);

	return (
		<ul className={styles.container}>
			{pages_sorted.map(({ url_path, frontmatter }) => (
				<li key={url_path} className={styles.item}>
					<Link href={url_path}>
						<a className={styles.link}>
							<div className={styles.image_container}>
								<ImageImported
									alt={frontmatter.title}
									src={frontmatter.thumb_img}
									style={{
										container: { paddingBottom: undefined },
									}}
								/>
							</div>

							<div className={styles.title_container}>
								<h3 className={styles.title}>
									{frontmatter.title}
								</h3>

								{frontmatter.subtitle && (
									<span className={styles.subtitle}>
										{frontmatter.subtitle}
									</span>
								)}
							</div>
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
};
