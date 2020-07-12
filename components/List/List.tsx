import React, { FunctionComponent } from "react";
import Link from "next/link";

import { Props as StylesProps } from "@utils/useStyles";
import { Container } from "@/Container";
import styles from "./List.styl";

interface Props extends StylesProps {
	entries: Entry[];
	show_subtitle?: boolean;
}

export const List: FunctionComponent<Props> = props => {
	const { entries, show_subtitle, ...rest } = props;

	return (
		<Container {...rest} className={styles.container} html_tag="ul">
			{props.children}

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

							<h3 className={styles.title}>
								{frontmatter.title}
							</h3>

							{show_subtitle && (
								<h5 className={styles.subtitle}>
									{frontmatter.subtitle}
								</h5>
							)}
						</a>
					</Link>
				</li>
			))}
		</Container>
	);
};
