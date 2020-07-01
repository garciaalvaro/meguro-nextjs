import React, { Fragment, FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";

const paragraph: FunctionComponent = ({ children }) => (
	<Fragment>{children}</Fragment>
);

export const code: FunctionComponent<{ value: string; language: string }> = ({
	value,
	language,
}) => {
	if (language === "images") {
		return (
			<ReactMarkdown
				source={value}
				escapeHtml={false}
				renderers={{
					paragraph,
				}}
			/>
		);
	}

	return <ReactMarkdown source={value} escapeHtml={false} />;
};
