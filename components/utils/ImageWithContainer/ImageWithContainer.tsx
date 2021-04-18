import React, { useState } from "react";
import type { FunctionComponent, CSSProperties } from "react";

import { className } from "@utils";
import styles from "./ImageWithContainer.styl";

export interface ImageWithContainerProps {
	src: string;
	srcSet: string;
	"data-width": number;
	"data-height": number;
	"data-modal_width"?: number;
	alt?: string;
	sizes?: string;
	className?: { image?: string; container?: string; is_loading?: string };
	style?: {
		image?: CSSProperties;
		container?: CSSProperties;
	};
	attributes?: {
		image?: Record<string, unknown>;
		container?: Record<string, unknown>;
	};
}

export const ImageWithContainer: FunctionComponent<ImageWithContainerProps> = props => {
	const { attributes, style, ...rest } = props;

	const [is_loading, setIsLoading] = useState(true);

	const paddingBottom = `${
		(Number(rest["data-height"]) / Number(rest["data-width"])) * 100
	}%`;

	return (
		<div
			className={className(
				styles.container,
				...(is_loading ? [styles.is_loading] : []),
				...(is_loading && props.className?.is_loading
					? [props.className?.is_loading]
					: []),
				...(props.className?.container
					? [props.className.container]
					: [])
			)}
			style={{
				paddingBottom,
				...(style?.container ? style.container : {}),
			}}
			{...(attributes?.container || {})}
		>
			<img
				{...(attributes?.image || {})}
				{...rest}
				className={className(
					styles.image,
					...(props.className?.image ? [props.className.image] : [])
				)}
				style={style?.image ? style.image : {}}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
			/>
		</div>
	);
};
