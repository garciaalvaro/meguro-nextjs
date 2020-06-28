import React, { FunctionComponent, Fragment } from "react";
import ReactMarkdown from "react-markdown";

import styles from "./Home.styl";
import { Header } from "@/Header";
import { Column } from "@/Column";
import { Content } from "@/Content";
import { List } from "@/List";
import { Main } from "@/Main";

interface Props {
	projects: Entry[];
	content: Entry["content"];
}

export const Home: FunctionComponent<Props> = props => {
	const { content, projects } = props;

	return (
		<Fragment>
			<Main>
				<Column>
					<Header
						title={process.env.site_title}
						subtitle={process.env.site_description}
						href="/"
					/>

					<Content>
						<ReactMarkdown source={content} escapeHtml={false} />
					</Content>
				</Column>

				<Column>
					<List className={styles.projects} entries={projects}></List>
				</Column>
			</Main>
		</Fragment>
	);
};
