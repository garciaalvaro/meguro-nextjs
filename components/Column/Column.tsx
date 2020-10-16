import React, { FunctionComponent } from "react";

import styles from "./Column.styl";

interface Props {
	className_container?: string;
	className_content?: string;
}

export const Column: FunctionComponent<Props> = props => {
	const className_container = [
		styles.container,
		...(props.className_container ? [props.className_container] : []),
	].join(" ");

	const className_content = [
		styles.content,
		...(props.className_content ? [props.className_content] : []),
	].join(" ");

	return (
		<div className={className_container}>
			<div className={className_content}>{props.children}</div>
		</div>
	);
};
