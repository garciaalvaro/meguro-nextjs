import React, { FunctionComponent, CSSProperties } from "react";

import { Column } from "@/Column";
import styles from "./components.styl";

interface Props {
	style?: CSSProperties;
}

export const Column1: FunctionComponent<Props> = props => {
	return (
		<Column
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
			className_container={styles.column_2_container}
			className_content={styles.column_2_content}
			style={props.style}
		>
			{props.children}
		</Column>
	);
};
