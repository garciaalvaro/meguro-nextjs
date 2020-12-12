import React, { FunctionComponent, useContext } from "react";
import Link from "next/link";

import { Context } from "@context";
import { Image } from "@/Image";
import styles from "./ListItem.styl";

interface Props {
	url_path: Page["url_path"];
	frontmatter: Page["frontmatter"];
}

export const ListItem: FunctionComponent<Props> = props => {
	const { url_path, frontmatter } = props;

	const { active_url_path, setActiveUrlPath } = useContext(Context);

	const is_active = active_url_path === url_path;

	const className = [
		styles.container,
		...(is_active ? [styles.is_active] : []),
	].join(" ");

	return (
		<li className={className}>
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
							alt={url_path === "/" ? "Home" : frontmatter.title}
							className_image={styles.image}
							src={frontmatter.thumb_img}
							set_padding_bottom={false}
						/>
					</div>

					<div className={styles.text_container}>
						<span className={styles.title}>
							{frontmatter.title}
						</span>
					</div>
				</a>
			</Link>
		</li>
	);
};
