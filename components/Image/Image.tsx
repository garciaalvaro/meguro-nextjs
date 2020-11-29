import React, { FunctionComponent, useState, useRef } from "react";

import styles from "./Image.styl";

interface Props {
	set_padding_bottom?: boolean;
	src: string;
	className_image?: string;
	className_container?: string;
	sizes?: string;
	alt?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

interface ResponsiveLoader {
	src: string;
	srcSet: string;
	ratio: number;
}

export const Image: FunctionComponent<Props> = props => {
	const {
		sizes,
		alt,
		set_padding_bottom,
		src,
		className_container,
		className_image,
		...rest
	} = props;

	const [is_loading, setIsLoading] = useState(true);

	const { current: responsive } = useRef<ResponsiveLoader>(
		(() => {
			const {
				src,
				srcSet,
				width,
				height,
			}: {
				src: string;
				srcSet: string;
				width: number;
				height: number;
			} = require("@content/" + props.src.replace(/^\//, ""));

			return { srcSet, src, ratio: width / height };
		})()
	);

	return (
		<div
			className={[
				styles.container,
				...(is_loading ? [styles.is_loading] : []),
				...(props.className_container
					? [props.className_container]
					: []),
			].join(" ")}
			style={{
				paddingBottom:
					set_padding_bottom === false
						? undefined
						: `${(1 / responsive.ratio) * 100}%`,
			}}
			{...rest}
		>
			<img
				alt={alt}
				sizes={sizes}
				data-src={src}
				src={responsive.src}
				srcSet={responsive.srcSet}
				className={[
					styles.image,
					...(props.className_image ? [props.className_image] : []),
				].join(" ")}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
			/>
		</div>
	);
};
