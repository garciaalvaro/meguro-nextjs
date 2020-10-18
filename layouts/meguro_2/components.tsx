import React, { Fragment, FunctionComponent } from "react";

import { Column } from "@/Column";
import styles from "./components.styl";
import { useIsMobile } from "@utils";

const breakpoint = 800 - 1;

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
	const is_mobile = useIsMobile(breakpoint);

	if (is_mobile) {
		return <Fragment>{props.children}</Fragment>;
	}

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

export const Title: FunctionComponent = props => {
	return <div className={styles.column_2_title}>{props.children}</div>;
};

export const Description: FunctionComponent = props => {
	return <div className={styles.column_2_description}>{props.children}</div>;
};
