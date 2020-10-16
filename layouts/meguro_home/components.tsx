import React, { FunctionComponent } from "react";

import { Column } from "@/Column";
import styles from "./components.styl";

export const Column1: FunctionComponent = props => {
	return (
		<Column
			className_container={styles.column_1_container}
			className_content={styles.column_1_content}
		>
			{props.children}
		</Column>
	);
};

export const Column2: FunctionComponent = props => {
	return (
		<Column
			className_container={styles.column_2_container}
			className_content={styles.column_2_content}
		>
			{props.children}
		</Column>
	);
};
