import { useRef } from "react";

import styles from "./styles.styl";

export interface Props {
	row_separation?: number;
	column_separation?: number;
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

export const useStyles = (
	props: Props
): {
	style: Record<string, string | number | undefined>;
	classNames: string;
	classNames_content: string;
} => {
	const {
		column_separation,
		child_separation,
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

	const row_separation = child_separation || props.row_separation;

	const li_separator = props.li_separator
		? props.li_separator === "|"
			? "7C"
			: "2D"
		: null;

	const has_content_element = !!content_max_width;

	const classNames = useRef(
		[
			...(has_content_element
				? []
				: [styles.grid, styles[`row_separation-${row_separation}`]]),

			styles[`column_separation-${column_separation}`],
			styles[`li_separator-${li_separator}`],
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

	const classNames_content = useRef(
		[
			styles.grid,
			styles[`max_width-${content_max_width}`],
			styles[`align-${content_align}`],
			styles[`row_separation-${row_separation}`],
		]
			.filter(className => className)
			.join(" ")
	);

	const style = useRef({ color, backgroundColor });

	return {
		style: style.current,

		classNames: classNames.current,

		classNames_content: !has_content_element
			? ""
			: classNames_content.current,
	};
};
