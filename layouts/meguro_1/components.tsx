import React from "react";
import type { FunctionComponent, CSSProperties } from "react";

import { Column } from "@components/utils";
import styles from "./components.module.sass";

interface Props {
	style?: CSSProperties;
	use_modal?: boolean;
}

// column_1_width + column_2_width + sidebar_width
export const breakpoint = 400 + 250 + 90;

export const Column1: FunctionComponent<Props> = props => {
	const { style, use_modal, children } = props;

	return (
		<Column
			breakpoint={breakpoint}
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
			breakpoint={breakpoint}
			className_container={styles.column_2_container}
			className_content={styles.column_2_content}
			style={style}
			use_modal={use_modal}
		>
			{children}
		</Column>
	);
};
