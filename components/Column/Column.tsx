import React, { FunctionComponent } from "react";

import styles from "./Column.styl";

export const Column: FunctionComponent = props => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>{props.children}</div>
		</div>
	);
};
