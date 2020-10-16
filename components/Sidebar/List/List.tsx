import React, { FunctionComponent, useRef, useContext } from "react";
import Link from "next/link";

import { Context } from "@context";
import styles from "./List.styl";

export const List: FunctionComponent = () => {
	const background_color = process.env.sidebar_background_color;

	const { pages, projects, slug: active_slug } = useContext(Context);

	const { current: entries } = useRef(
		[...pages, ...projects].sort(a => {
			if (a.path === "/") {
				return -1;
			}

			return 0;
		})
	);

	return (
		<ul
			className={styles.container}
			style={{ backgroundColor: background_color || "" }}
		>
			{entries.map(({ path, frontmatter }) => (
				<li
					key={path}
					className={[
						styles.item,
						...(active_slug === path.slice(1)
							? [styles.is_active]
							: []),
					].join(" ")}
				>
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
