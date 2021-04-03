import React from "react";
import type { FunctionComponent, CSSProperties } from "react";

import styles from "./Columns.styl";
import { className } from "@utils";

interface Props {
	style?: CSSProperties;
	center_column?: boolean;
	column_min_width?: string;
	column_max_width?: string;
	column_gap?: string;
	row_gap?: string;
}

export const Columns: FunctionComponent<Props> = props => {
	const {
		children,
		center_column,
		column_gap,
		column_min_width,
		column_max_width,
		row_gap,
	} = props;

	const style = {
		...(props.style || {}),

		columnGap: column_gap ? column_gap : undefined,

		rowGap: row_gap ? row_gap : undefined,

		gridTemplateColumns:
			column_min_width || column_max_width
				? `repeat(auto-fit, minmax(${column_min_width || "auto"}, ${
						column_max_width || "auto"
				  }))`
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
