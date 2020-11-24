import React, { FunctionComponent, useState, useRef } from "react";

import styles from "./Image.styl";

interface Props {
	path: string;
	src: string;
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
		(() => {
			const data: Record<string, string> = require("@content/" +
				props.path +
				"/" +
				props.src);

			const src = data.src.replace("/_next/responsive-images", "");

			const srcSet = data.srcSet
				.split(",")
				.map(item => item.replace("/_next/responsive-images", ""))
				.join(",");

			return { srcSet, src };
		})()
	);

	const className = [
		styles.container,
		...(is_loading ? [styles.is_loading] : []),
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
