import React, { FunctionComponent } from "react";
import Link from "next/link";

import styles from "./Header.styl";

interface Props {
	title: string;
	subtitle?: string;
	href: string;
}

export const Header: FunctionComponent<Props> = props => {
	const { title, subtitle, href } = props;

	return (
		<div className={styles.container}>
			<h1>
				<Link href={href === "/" ? "/" : "/[slug]"} as={href}>
					<a>{title}</a>
				</Link>
			</h1>

			{subtitle && <h4>{subtitle}</h4>}
		</div>
	);
};
