import React, { FunctionComponent, useRef } from "react";

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
	const {
		current: { srcSet, src, ratio },
	} = useRef(
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
		<ImageWithContainer
			{...props}
			src={src}
			srcSet={srcSet}
			data-ratio={ratio}
		/>
	);
};
