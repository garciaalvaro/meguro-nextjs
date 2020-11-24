import React, { FunctionComponent, CSSProperties } from "react";

import { Column } from "@/Column";
import styles from "./components.styl";

interface Props {
	style?: CSSProperties;
	use_modal?: boolean;
}

export const breakpoint = 350 + 350 - 1;

export const Column1: FunctionComponent<Props> = props => {
	const { style, use_modal, children } = props;

	return (
		<Column
			className_container={styles.column_1_container}
			className_content={styles.column_1_content}
			style={style}
			use_modal={use_modal}
		>
			{children}
		</Column>
	);
};

export const Column2: FunctionComponent<Props> = props => {
	const { style, use_modal, children } = props;

	return (
		<Column
			className_container={styles.column_2_container}
			className_content={styles.column_2_content}
			style={style}
			use_modal={use_modal}
		>
			{children}
		</Column>
	);
};
