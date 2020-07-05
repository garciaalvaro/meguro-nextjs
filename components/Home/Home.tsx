import React, { FunctionComponent } from "react";

import styles from "./Home.styl";
import { Header } from "@/Header";
import { Column } from "@/Column";
import { Content } from "@/Content";
import { List } from "@/List";
import { Main } from "@/Main";

interface Props {
	slug: Entry["slug"];
	projects: Entry[];
}

export const Home: FunctionComponent<Props> = props => {
	const { slug, projects } = props;

	return (
		<Main>
			<Column>
				<Header
					title={process.env.site_title}
					subtitle={process.env.site_description}
					href="/"
				/>

				<Content slug={slug} />
			</Column>

			<Column>
				<List className={styles.projects} entries={projects}></List>
			</Column>
		</Main>
	);
};
