import React from "react";
import type { FunctionComponent, CSSProperties } from "react";

import styles from "./columns.module.sass";
import { className } from "@utils";

interface Props {
	style?: CSSProperties;
	center_column?: boolean;
	column_min_width?: number;
	column_max_width?: number;
	column_gap?: number;
	row_gap?: number;
}

export const Columns: FunctionComponent<Props> = props => {
	const { children, center_column, column_gap, row_gap } = props;

	const column_min_width = props.column_min_width
		? `${props.column_min_width}px`
		: "auto";

	const column_max_width = props.column_max_width
		? `${props.column_max_width}px`
		: "auto";

	const style = {
		...(props.style || {}),

		columnGap: column_gap ? column_gap : undefined,

		rowGap: row_gap ? row_gap : undefined,

		gridTemplateColumns:
			props.column_min_width || props.column_max_width
				? `repeat(auto-fit, minmax(${column_min_width}, ${column_max_width}))`
				: undefined,
	};

	return (
		<div
			className={className(
				styles.container,
				center_column ? styles.center_column : null
			)}
			style={style}
		>
			{children}
		</div>
	);
};
