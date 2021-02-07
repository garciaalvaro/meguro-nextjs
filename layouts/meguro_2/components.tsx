import React, { Fragment, FunctionComponent, CSSProperties } from "react";

import { Column } from "@/utils";
import styles from "./components.styl";
import { useIsMobile } from "@hooks";

interface Props {
	style?: CSSProperties;
	use_modal?: boolean;
}

// column_1_width + column_2_width + sidebar_width
export const breakpoint = 800;

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
	const is_mobile = useIsMobile(breakpoint);

	if (is_mobile) {
		return <Fragment>{children}</Fragment>;
	}

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
