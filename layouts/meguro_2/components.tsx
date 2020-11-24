import React, { Fragment, FunctionComponent, CSSProperties } from "react";

import { Column } from "@/Column";
import styles from "./components.styl";
import { useIsMobile } from "@utils";

interface Props {
	style?: CSSProperties;
}

export const breakpoint = 800 - 1;

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
	const is_mobile = useIsMobile(breakpoint);

	if (is_mobile) {
		return <Fragment>{props.children}</Fragment>;
	}

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

export const Title: FunctionComponent<Props> = props => {
	return (
		<div className={styles.column_2_title} style={props.style}>
			{props.children}
		</div>
	);
};

export const Description: FunctionComponent<Props> = props => {
	return (
		<div className={styles.column_2_description} style={props.style}>
			{props.children}
		</div>
	);
};
