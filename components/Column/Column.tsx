import React, { FunctionComponent } from "react";

import styles from "./Column.styl";

interface Props {
	flexBasis?: number;
}

export const Column: FunctionComponent<Props> = props => {
	const { flexBasis, children } = props;

	const style = {
		flexBasis: flexBasis ? `${flexBasis}rem` : undefined,
	};

	return (
		<div className={styles.container} style={style}>
			<div className={styles.content}>{children}</div>
		</div>
	);
};
