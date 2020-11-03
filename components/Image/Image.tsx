import React, { FunctionComponent, useState } from "react";

import styles from "./Image.styl";

interface Props {
	className?: string;
}

export const Image: FunctionComponent<Props> = props => {
	const [is_loading, setIsLoading] = useState(true);

	const className = [
		styles.container,
		...(is_loading ? [styles.is_loading] : []),
		...(props.className ? [props.className] : []),
	].join(" ");

	return (
		<div className={className}>
			<img
				{...props}
				className={styles.image}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
			/>
		</div>
	);
};
