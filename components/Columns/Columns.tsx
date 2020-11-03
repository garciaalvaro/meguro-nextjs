import React, { FunctionComponent, CSSProperties } from "react";

import styles from "./Columns.styl";

interface Props {
	style?: CSSProperties;
	column_width?: string;
	column_gap?: string;
}

export const Columns: FunctionComponent<Props> = props => {
	const { column_gap, column_width, children } = props;

	const style = {
		...(props.style || {}),

		columnGap: column_gap ? column_gap : undefined,

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
