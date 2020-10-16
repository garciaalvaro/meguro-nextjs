import React, { FunctionComponent, useContext } from "react";
import Link from "next/link";

import { Context } from "@context";
import styles from "./ProjectsList.styl";

export const ProjectsList: FunctionComponent = () => {
	const { projects } = useContext(Context);

	return (
		<ul className={styles.container}>
			{projects.map(({ path, frontmatter }) => (
				<li key={path} className={styles.item}>
					<Link href={path}>
						<a className={styles.link}>
							<div className={styles.image_container}>
								<img
									className={styles.image}
									src={frontmatter.thumb_img}
								/>
							</div>

							<div className={styles.text_container}>
								<h3 className={styles.title}>
									{frontmatter.title}
								</h3>

								{frontmatter.subtitle && (
									<h5 className={styles.subtitle}>
										<span>{frontmatter.subtitle}</span>
									</h5>
								)}
							</div>
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
};
