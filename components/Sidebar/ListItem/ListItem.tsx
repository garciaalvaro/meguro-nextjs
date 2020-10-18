import React, {
	FunctionComponent,
	useState,
	useContext,
	useEffect,
} from "react";
import Link from "next/link";

import { Context } from "@context";
import styles from "./ListItem.styl";

interface Props {
	path: Entry["path"];
	frontmatter: Entry["frontmatter"];
	background_color: string;
}

export const ListItem: FunctionComponent<Props> = props => {
	const { background_color, path, frontmatter } = props;

	const { active_path, setActivePath } = useContext(Context);

	const is_active = active_path === path;

	const className = [
		styles.container,
		...(is_active ? [styles.is_active] : []),
	].join(" ");

	return (
		<li style={{ backgroundColor: background_color }} className={className}>
			<Link href={path}>
				<a
					className={styles.link}
					onClick={e => {
						// Do not open the sidebar if
						// the clicked link is home.
						if (path === "/") {
							e.stopPropagation();
						} else {
							setActivePath(path);
						}
					}}
				>
					<div className={styles.image_container}>
						<img
							className={styles.image}
							src={frontmatter.thumb_img}
						/>
					</div>

					<div className={styles.text_container}>
						<h3 className={styles.title}>{frontmatter.title}</h3>

						{frontmatter.subtitle && (
							<h5 className={styles.subtitle}>
								<span>{frontmatter.subtitle}</span>
							</h5>
						)}
					</div>
				</a>
			</Link>
		</li>
	);
};
