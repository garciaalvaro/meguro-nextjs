import React, { useContext, useEffect, useRef } from "react";
import type { RefObject, FunctionComponent } from "react";
import Link from "next/link";
import type { Scrollbar } from "react-scrollbars-custom";

import { Context } from "@context";
import { ImageImported } from "@components/utils";
import { className } from "@utils";
import styles from "./ListItem.styl";

interface Props {
	$scroller?: RefObject<Scrollbar | null>;
	url_path: Page["url_path"];
	frontmatter: Page["frontmatter"];
}

export const ListItem: FunctionComponent<Props> = props => {
	const { $scroller, url_path, frontmatter } = props;

	const { active_url_path, setActiveUrlPath } = useContext(Context);

	const $li = useRef<HTMLLIElement | null>(null);

	const is_active = active_url_path === url_path;

	useEffect(() => {
		if (!$scroller?.current || !$li.current || !is_active) return;

		if (
			$li.current.offsetTop - $scroller.current.scrollTop <
			$li.current.clientHeight
		) {
			$scroller.current.scrollTop =
				$li.current.offsetTop - $li.current.clientHeight;
		} else if (
			$li.current.offsetTop +
				$li.current.clientHeight -
				$scroller.current.scrollTop >
			$scroller.current.clientHeight
		) {
			$scroller.current.scrollTop =
				$li.current.offsetTop -
				$scroller.current.clientHeight +
				$li.current.clientHeight;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [is_active]);

	return (
		<li
			ref={$li}
			className={className(
				styles.container,
				...(is_active ? [styles.is_active] : [])
			)}
		>
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
					data-testid="sidebar_link"
				>
					<div className={styles.image_container}>
						<ImageImported
							alt={
								url_path === "/"
									? "Logo"
									: `${frontmatter.title} thumbnail`
							}
							className={{ image: styles.image }}
							src={frontmatter.thumb_img}
							style={{ container: { paddingBottom: undefined } }}
							sizes="90px"
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
