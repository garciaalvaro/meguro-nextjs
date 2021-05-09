import React, { useRef } from "react";
import type { FunctionComponent } from "react";

import { ImageWithContainer } from "../ImageWithContainer";
import type { ImageWithContainerProps } from "../ImageWithContainer";

interface Props {
	src: string;
	alt?: string;
	"data-modal_width"?: number;
	className?: ImageWithContainerProps["className"];
	style?: ImageWithContainerProps["style"];
}

export const ImageImported: FunctionComponent<Props> = props => {
	const { srcSet, src, width, height } = useRef(
		(() => {
			const data: {
				src: string;
				srcSet: string;
				width: number;
				height: number;
				images: { width: number; height: number; path: number }[];
			} = require("@content/" + props.src.replace(/^\//, ""));

			const { src, srcSet, images } = data;

			const { width, height } = images.slice(-1)[0];

			return { srcSet, src, width, height };
		})()
	).current;

	return (
		<ImageWithContainer
			{...props}
			src={src}
			srcSet={srcSet}
			data-width={width}
			data-height={height}
		/>
	);
};
