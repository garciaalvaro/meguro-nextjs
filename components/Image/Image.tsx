import React, { FunctionComponent, useState, useRef } from "react";

import styles from "./Image.styl";

interface Props {
	set_padding_bottom?: boolean;
	path: string;
	src: string;
	className?: string;
	sizes?: string;
	alt?: string;
}

interface ResponsiveLoader {
	src: string;
	srcSet: string;
	ratio: number;
}

export const Image: FunctionComponent<Props> = props => {
	const { sizes, alt, set_padding_bottom, className } = props;

	const [is_loading, setIsLoading] = useState(true);

	const {
		current: { src, srcSet, ratio },
	} = useRef<ResponsiveLoader>(
		(() => {
			const data: {
				src: string;
				srcSet: string;
				width: number;
				height: number;
			} = require("@content/" + props.path + "/" + props.src);

			const src = data.src.replace("/_next/responsive-images", "");

			const srcSet = data.srcSet
				.split(",")
				.map(item => item.replace("/_next/responsive-images", ""))
				.join(",");

			return { srcSet, src, ratio: data.width / data.height };
		})()
	);

	const className_container = [
		styles.container,
		...(is_loading ? [styles.is_loading] : []),
	].join(" ");

	const className_image = [
		styles.image,
		...(className ? [className] : []),
	].join(" ");

	return (
		<div
			className={className_container}
			style={{
				paddingBottom:
					set_padding_bottom === false
						? undefined
						: `${(1 / ratio) * 100}%`,
			}}
		>
			<img
				alt={alt}
				sizes={sizes}
				src={src}
				srcSet={srcSet}
				className={className_image}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
			/>
		</div>
	);
};
