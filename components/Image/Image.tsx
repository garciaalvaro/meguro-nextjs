import React, { FunctionComponent, useState, useRef, useEffect } from "react";

import styles from "./Image.styl";

export interface ResponsiveLoader {
	src: string;
	srcSet: string;
	ratio: number;
	width: number;
	height: number;
}

interface Props {
	setImageData?: (data: ResponsiveLoader) => void;
	style_image?: Record<string, string | undefined>;
	src: string;
	className_image?: string;
	className_container?: string;
	sizes?: string;
	alt?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export const Image: FunctionComponent<Props> = props => {
	const {
		setImageData,
		style_image,
		sizes,
		alt,
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

			return { srcSet, src, ratio: width / height, width, height };
		})()
	);

	useEffect(() => {
		if (!setImageData) return;

		setImageData(responsive);
	}, []);

	return (
		<div
			className={[
				styles.container,
				...(is_loading ? [styles.is_loading] : []),
				...(className_container ? [className_container] : []),
			].join(" ")}
			style={{
				paddingBottom: `${(1 / responsive.ratio) * 100}%`,
				...(style_image || {}),
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
					...(className_image ? [className_image] : []),
				].join(" ")}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
			/>
		</div>
	);
};
