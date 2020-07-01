import React, { FunctionComponent, Fragment } from "react";
import ReactMarkdown from "react-markdown";

import styles from "./Single.styl";
import { Header } from "@/Header";
import { Column } from "@/Column";
import { Content } from "@/Content";
import { Main } from "@/Main";

interface Props {
	frontmatter: Entry["frontmatter"];
	content: Entry["content"];
	slug: Entry["slug"];
}

const paragraphRenderer: FunctionComponent = ({ children }) => (
	<Fragment>{children}</Fragment>
);

const descriptionRenderer: FunctionComponent<{
	value: string;
	language: string;
}> = ({ value, language }) => {
	if (language !== "description") {
		return null;
	}

	return <ReactMarkdown source={value} escapeHtml={false} />;
};

export const imagesRenderer: FunctionComponent<{
	value: string;
	language: string;
}> = ({ value, language }) => {
	if (language !== "images") {
		return null;
	}

	return (
		<ReactMarkdown
			source={value}
			escapeHtml={false}
			renderers={{
				paragraph: paragraphRenderer,
			}}
		/>
	);
};

export const Single: FunctionComponent<Props> = props => {
	const { content, frontmatter, slug } = props;

	const flexBasis = parseInt(
		(frontmatter?.description_width as string) || ""
	);

	return (
		<Fragment>
			<Main>
				<Column flexBasis={flexBasis / 10 || undefined}>
					<Header
						title={frontmatter.title}
						subtitle={frontmatter.subtitle}
						href={`/${slug}`}
					/>

					<Content>
						<ReactMarkdown
							source={content}
							escapeHtml={false}
							renderers={{ code: descriptionRenderer }}
						/>
					</Content>
				</Column>

				<Column
					flexBasis={flexBasis ? (2.25 * flexBasis) / 10 : undefined}
				>
					<ReactMarkdown
						source={content}
						escapeHtml={false}
						renderers={{ code: imagesRenderer }}
					/>
				</Column>
			</Main>
		</Fragment>
	);
};
