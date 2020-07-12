import React, { FunctionComponent, useRef } from "react";

import styles_utils from "@utils/styles.styl";
import styles_component from "./Container.styl";

export interface ContainerProps {
	type?: "info" | "column";
	html_tag?: "hr" | "h1" | "ul"; // TODO
	child_separation?: number;
	li_separator?: "|" | "-";
	color?: string;
	background_color?: string;
	min_width?: number;
	max_width?: number;
	content_max_width?: number;
	content_align?: "left" | "right" | "center";
	margin?: number;
	margin_top?: number;
	margin_bottom?: number;
	margin_left?: number;
	margin_right?: number;
	padding?: number;
	padding_top?: number;
	padding_bottom?: number;
	padding_left?: number;
	padding_right?: number;
	border?: number;
	border_top?: number;
	border_bottom?: number;
	border_left?: number;
	border_right?: number;
}

const styles = { ...styles_component, ...styles_utils };

export const Container: FunctionComponent<ContainerProps> = props => {
	const {
		type,
		child_separation,
		li_separator,
		color,
		background_color: backgroundColor,
		min_width,
		max_width,
		content_max_width,
		content_align,
		margin,
		margin_top,
		margin_bottom,
		margin_left,
		margin_right,
		padding,
		padding_top,
		padding_bottom,
		padding_left,
		padding_right,
		border,
		border_top,
		border_bottom,
		border_left,
		border_right,
	} = props;

	const classNames = useRef(
		[
			styles.container,
			styles[`type-${type}`],
			!content_max_width && child_separation
				? styles.has_child_separation
				: null,
			!content_max_width && child_separation
				? styles[`child_separation-${child_separation}`]
				: null,
			li_separator !== undefined
				? styles[`li_separator-${li_separator === "|" ? "7C" : "2D"}`]
				: null,
			styles[`min_width-${min_width}`],
			styles[`max_width-${max_width}`],
			styles[`padding-${padding}`],
			styles[`padding_top-${padding_top}`],
			styles[`padding_bottom-${padding_bottom}`],
			styles[`padding_left-${padding_left}`],
			styles[`padding_right-${padding_right}`],
			styles[`margin-${margin}`],
			styles[`margin_top-${margin_top}`],
			styles[`margin_bottom-${margin_bottom}`],
			styles[`margin_left-${margin_left}`],
			styles[`margin_right-${margin_right}`],
			styles[`border-${border}`],
			styles[`border_top-${border_top}`],
			styles[`border_bottom-${border_bottom}`],
			styles[`border_left-${border_left}`],
			styles[`border_right-${border_right}`],
		]
			.filter(className => className)
			.join(" ")
	);

	const style = useRef({ color, backgroundColor });

	const content_classNames = useRef(
		[
			styles.content,
			styles[`max_width-${content_max_width}`],
			styles[`align-${content_align}`],
			child_separation ? styles.has_child_separation : null,
			styles[`child_separation-${child_separation}`],
		]
			.filter(className => className)
			.join(" ")
	);

	const Tag = props.html_tag || "div";

	if (props.html_tag === "hr") {
		return <hr className={classNames.current} />;
	}

	return (
		<Tag className={classNames.current} style={style.current}>
			{content_max_width && (
				<div className={content_classNames.current}>
					{props.children}
				</div>
			)}

			{!content_max_width && props.children}
		</Tag>
	);
};
