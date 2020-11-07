import React, { FunctionComponent, useContext } from "react";
import Link from "next/link";

import { Context } from "@context";
import styles from "./PagesList.styl";

export const PagesList: FunctionComponent = () => {
	const { pages } = useContext(Context);

	return (
		<ul className={styles.container}>
			{pages.map(({ url_path, frontmatter }) => (
				<li key={url_path} className={styles.item}>
					<Link href={url_path}>
						<a className={styles.link}>
							<div className={styles.image_container}>
								<img
									className={styles.image}
									src={frontmatter.thumb_img}
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
