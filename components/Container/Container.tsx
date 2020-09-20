import React, { FunctionComponent } from "react";

import { useStyles, Props as StylesProps } from "@utils/useStyles";
import styles from "./Container.styl";

interface Props extends StylesProps {
	className?: string;
	html_tag?: "ul" | "div" | "hr";
	type?: "column" | "info";
}

export const Container: FunctionComponent<Props> = props => {
	const { html_tag, type } = props;
	const { classNames, classNames_content, style } = useStyles(props);
	const HtmlTag = html_tag || "div";
	const has_content_element = !!classNames_content;

	const className = [
		...([props.className] || []),
		styles.container,
		styles[`type-${type}`],
		classNames,
	].join(" ");

	if (HtmlTag === "hr") {
		return <hr className={className} style={style} />;
	}

	return (
		<HtmlTag className={className} style={style}>
			{has_content_element && (
				<div className={classNames_content}>{props.children}</div>
			)}

			{!has_content_element && props.children}
		</HtmlTag>
	);
};
