import React from "react";
import type { FunctionComponent, CSSProperties } from "react";

import styles from "./container.module.sass";
import { className } from "@utils";

interface Props {
	use_border?: boolean;
	style: CSSProperties;
}

export const Container: FunctionComponent<Props> = props => {
	const { use_border, style } = props;

	return (
		<div
			className={className({
				[styles.container]: true,
				[styles.use_border]: !!use_border,
			})}
			style={style}
		>
			{props.children}
		</div>
	);
};
