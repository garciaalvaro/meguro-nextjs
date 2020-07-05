import React, { FunctionComponent, useRef } from "react";

import styles from "./Column.styl";

interface Props {
	width?: number;
	shrink?: number;
	grow?: number;
}

export const Column: FunctionComponent<Props> = props => {
	const { width, shrink, grow, children } = props;

	const classNames = useRef(
		[
			styles.container,
			width !== undefined ? styles[`width-${width}`] : null,
			shrink !== undefined ? styles[`shrink-${shrink}`] : null,
			grow !== undefined ? styles[`grow-${grow}`] : null,
		]
			.filter(className => className)
			.join(" ")
	);

	return <div className={classNames.current}>{children}</div>;
};
