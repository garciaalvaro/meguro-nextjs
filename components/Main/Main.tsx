import React, { FunctionComponent } from "react";

import styles from "./Main.styl";

export const Main: FunctionComponent = props => {
	return <main className={styles.container}>{props.children}</main>;
};
