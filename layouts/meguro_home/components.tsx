import React, { FunctionComponent, CSSProperties } from "react";

import { Column } from "@/Column";
import styles from "./components.styl";

interface Props {
	style?: CSSProperties;
}

// column_1_width + column_2_width
const breakpoint = 350 + 350 - 1;

export const Column1: FunctionComponent<Props> = props => {
	return (
		<Column
			breakpoint={breakpoint}
			className_container={styles.column_1_container}
			className_content={styles.column_1_content}
			style={props.style}
		>
			{props.children}
		</Column>
	);
};

export const Column2: FunctionComponent<Props> = props => {
	return (
		<Column
			breakpoint={breakpoint}
			className_container={styles.column_2_container}
			className_content={styles.column_2_content}
			style={props.style}
		>
			{props.children}
		</Column>
	);
};
