import React, { useState } from "react";
import type { FunctionComponent, CSSProperties } from "react";

import styles from "./ImageWithContainer.styl";

export interface ImageWithContainerProps {
	src: string;
	srcSet: string;
	"data-width": number;
	"data-height": number;
	"data-modal_width"?: number;
	alt?: string;
	sizes?: string;
	className?: { image?: string; container?: string };
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
	const { attributes, className, style, ...rest } = props;

	const [is_loading, setIsLoading] = useState(true);

	return (
		<div
			className={[
				styles.container,
				...(is_loading ? [styles.is_loading] : []),
				...(className?.container ? [className.container] : []),
			].join(" ")}
			style={{
				paddingBottom: `${
					(Number(rest["data-height"]) / Number(rest["data-width"])) *
					100
				}%`,
				...(style?.container ? style.container : {}),
			}}
			{...(attributes?.container || {})}
		>
			<img
				{...(attributes?.image || {})}
				{...rest}
				className={[
					styles.image,
					...(className?.image ? [className.image] : []),
				].join(" ")}
				style={style?.image ? style.image : {}}
				onLoad={() => setIsLoading(false)}
				loading="lazy"
			/>
		</div>
	);
};
