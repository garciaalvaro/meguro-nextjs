import React, { FunctionComponent, useContext } from "react";
import Link from "next/link";

import { Context } from "@context";
import { Image } from "@/Image";
import styles from "./ListItem.styl";

interface Props {
	url_path: Page["url_path"];
	frontmatter: Page["frontmatter"];
	background_color: string;
}

export const ListItem: FunctionComponent<Props> = props => {
	const { background_color, url_path, frontmatter } = props;

	const { active_url_path, setActiveUrlPath } = useContext(Context);

	const is_active = active_url_path === url_path;

	const className = [
		styles.container,
		...(is_active ? [styles.is_active] : []),
	].join(" ");

	return (
		<li style={{ backgroundColor: background_color }} className={className}>
			<Link href={url_path}>
				<a
					className={styles.link}
					onClick={e => {
						// Do not open the sidebar if
						// the clicked link is home.
						if (url_path === "/") {
							e.stopPropagation();
						} else {
							setActiveUrlPath(url_path);
						}
					}}
				>
					<div className={styles.image_container}>
						<Image
							className={styles.image}
							src={frontmatter.thumb_img}
							path={frontmatter.path}
						/>
					</div>

					<div className={styles.text_container}>
						<span className={styles.title}>
							{frontmatter.title}
						</span>

						{frontmatter.subtitle && (
							<span className={styles.subtitle}>
								{frontmatter.subtitle}
							</span>
						)}
					</div>
				</a>
			</Link>
		</li>
	);
};
