import React, { FunctionComponent, CSSProperties } from "react";

import styles from "./Columns.styl";

interface Props {
	style?: CSSProperties;
	column_width?: string;
	column_gap?: string;
	row_gap?: string;
}

export const Columns: FunctionComponent<Props> = props => {
	const { children, column_gap, column_width, row_gap } = props;

	const style = {
		...(props.style || {}),

		columnGap: column_gap ? column_gap : undefined,

		rowGap: row_gap ? row_gap : undefined,

		gridTemplateColumns: column_width
			? `repeat(auto-fit, minmax(${column_width}, auto))`
			: undefined,
	};

	return (
		<div className={styles.container} style={style}>
			{children}
		</div>
	);
};
