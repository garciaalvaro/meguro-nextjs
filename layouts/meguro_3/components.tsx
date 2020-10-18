import React, { FunctionComponent } from "react";

import { Column } from "@/Column";
import styles from "./components.styl";

// column_1_width + column_2_width + column_3_width + sidebar_width
const breakpoint = 400 + 200 + 200 + 90 - 1;

export const Column1: FunctionComponent = props => {
	return (
		<Column
			breakpoint={breakpoint}
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
			breakpoint={breakpoint}
			className_container={styles.column_2_container}
			className_content={styles.column_2_content}
		>
			{props.children}
		</Column>
	);
};

export const Column3: FunctionComponent = props => {
	return (
		<Column
			breakpoint={breakpoint}
			className_container={styles.column_3_container}
			className_content={styles.column_3_content}
		>
			{props.children}
		</Column>
	);
};
