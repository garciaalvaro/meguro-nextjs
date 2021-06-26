import React from "react";
import type { FunctionComponent } from "react";

import { className } from "@utils";
import styles from "./Info.module.sass";

interface Props {
	li_separator?: string;
}

export const Info: FunctionComponent<Props> = props => {
	const li_separator = props.li_separator
		? props.li_separator === "|"
			? "7C"
			: "2D"
		: null;

	return (
		<div
			className={className(
				styles.container,
				styles[`li_separator-${li_separator}`]
			)}
		>
			{props.children}
		</div>
	);
};
