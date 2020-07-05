import React, { FunctionComponent, useRef } from "react";

import styles from "./Container.styl";

interface Props {
	padding?: number;
	gap?: number;
	color?: string;
	background_color?: string;
}

export const Container: FunctionComponent<Props> = props => {
	const { padding, gap, color, background_color, children } = props;

	const classNames = useRef(
		[
			styles.container,
			padding !== undefined ? styles[`padding-${padding}`] : null,
			gap !== undefined ? styles[`gap-${gap}`] : null,
		]
			.filter(className => className)
			.join(" ")
	);

	const style = useRef({
		color,
		backgroundColor: background_color,
	});

	return (
		<div className={classNames.current} style={style.current}>
			{children}
		</div>
	);
};
