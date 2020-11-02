import React, { FunctionComponent, useState, useContext } from "react";

import styles from "./Image.styl";
import { Context } from "@context";

interface Props {
	className?: string;
	src: string;
}

export const Image: FunctionComponent<Props> = props => {
	const [is_loading, setIsLoading] = useState(true);
	const { slug } = useContext(Context);

	const className = [
		styles.container,
		...(is_loading ? [styles.is_loading] : []),
		...(props.className ? [props.className] : []),
	].join(" ");

	const src =
		!props.src || /^\/|^http/.test(props?.src)
			? props?.src
			: `/assets/${slug}/${props.src}`;

	return (
		<div className={className}>
			<img
				{...props}
				src={src}
				className={styles.image}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
			/>
		</div>
	);
};
