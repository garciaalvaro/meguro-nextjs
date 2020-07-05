import React, { FunctionComponent } from "react";
import Link from "next/link";

import styles from "./Header.styl";

interface Props {
	href: string;
	title: string;
	subtitle?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;
}

export const Header: FunctionComponent<Props> = props => {
	const { title, subtitle, href } = props;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				<Link href={href === "/" ? "/" : "/[slug]"} as={href}>
					<a>{title}</a>
				</Link>
			</h1>

			{subtitle && <h4 className={styles.subtitle}>{subtitle}</h4>}
		</div>
	);
};
