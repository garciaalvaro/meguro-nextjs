import React, { FunctionComponent, useState, useRef } from "react";

import styles from "./Image.styl";

interface Props {
	path: string;
	src: string;
	className?: string;
}

interface ResponsiveLoader {
	src: string;
	srcSet: string;
}

export const Image: FunctionComponent<Props> = props => {
	const [is_loading, setIsLoading] = useState(true);

	const {
		current: { src, srcSet },
	} = useRef<ResponsiveLoader>(
		require("@content/" + props.path + "/" + props.src)
	);

	const className = [
		styles.container,
		...(is_loading ? [styles.is_loading] : []),
		...(props.className ? [props.className] : []),
	].join(" ");

	return (
		<div className={className}>
			<img
				{...props}
				src={src}
				srcSet={srcSet}
				className={styles.image}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
			/>
		</div>
	);
};
