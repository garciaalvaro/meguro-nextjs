import React, { FunctionComponent } from "react";
import Link from "next/link";

import styles from "./Sidebar.styl";
import { List } from "@/List";

interface Props {
	entries: Entry[];
}

export const Sidebar: FunctionComponent<Props> = props => {
	const { entries } = props;
	const site_title = process.env.site_title;
	const site_logo = process.env.site_logo;

	return (
		<nav className={styles.container}>
			<List entries={entries}>
				<li>
					<Link href="/">
						<a>
							<img src={site_logo} />

							<h3>{site_title}</h3>
						</a>
					</Link>
				</li>
			</List>
		</nav>
	);
};
