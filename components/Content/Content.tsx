import React, { FunctionComponent } from "react";

import styles from "./Content.styl";

export const Content: FunctionComponent = props => {
	return <div className={styles.container}>{props.children}</div>;
};
