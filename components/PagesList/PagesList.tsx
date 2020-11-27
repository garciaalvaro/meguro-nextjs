import React, { FunctionComponent } from "react";
import Link from "next/link";

import { Image } from "../Image";
import { usePages } from "@utils";
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
								<Image
									src={frontmatter.thumb_img}
									path={"pages" + url_path}
									set_padding_bottom={false}
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
