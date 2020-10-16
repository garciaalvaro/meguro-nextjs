import React, { FunctionComponent } from "react";

import styles from "./Main.styl";

interface Props {
	is_home?: boolean;
}

export const Main: FunctionComponent<Props> = props => {
	const className = [
		styles.container,
		...(props.is_home ? [styles.is_home] : []),
	].join(" ");

	return <main className={className}>{props.children}</main>;
};
