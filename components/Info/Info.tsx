import React, { FunctionComponent } from "react";

import { Container } from "@/Container";
import styles from "./Info.styl";

interface Props {
	li_separator?: string;
}

export const Info: FunctionComponent<Props> = props => {
	const li_separator = props.li_separator
		? props.li_separator === "|"
			? "7C"
			: "2D"
		: null;

	const className = [
		styles.container,
		styles[`li_separator-${li_separator}`],
	].join(" ");

	return <Container className={className}>{props.children}</Container>;
};
