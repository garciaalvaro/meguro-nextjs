import React, { Fragment, useState, useEffect, useRef } from "react";
import type { FunctionComponent } from "react";
import { createPortal } from "react-dom";

import { ImageWithContainer } from "../utils";
import { useWindowSize } from "@hooks";
import { Navigation } from "./Navigation";
import styles from "./Modal.styl";

interface ImageData {
	src: string;
	src_set: string;
	width: number;
	height: number;
	modal_width?: number;
}

export interface ModalProps {
	images_data: ImageData[];
	initial_src: string;
	closeModal: () => void;
}

export const ModalContent: FunctionComponent<ModalProps> = props => {
	const { images_data, initial_src, closeModal } = props;

	const [direction, setDirection] = useState<"left" | "right" | null>(null);

	const $content = useRef<HTMLDivElement | null>(null);

	const [image_style, setImageStyle] = useState({});

	const { window_width, window_height } = useWindowSize();

	const [image_index, setImageIndex] = useState(
		(() => {
			const index = images_data.findIndex(
				({ src }) => src === initial_src
			);

			return index < 0 ? 0 : index;
		})()
	);

	const image_data = images_data[image_index];

	useEffect(() => {
		if (!image_data || !$content.current) return;

		const container_ratio =
			$content.current.clientWidth / $content.current.clientHeight;

		const image_ratio = image_data.width / image_data.height;

		if (container_ratio > image_ratio) {
			const height = Math.min(
				$content.current.clientHeight,
				(image_data.modal_width || image_data.width) / image_ratio
			);

			setImageStyle({
				height,
				width: height * image_ratio,
				paddingBottom: undefined,
			});
		} else {
			const width = Math.min(
				$content.current.clientWidth,
				image_data.modal_width || image_data.width
			);

			setImageStyle({
				height: width / image_ratio,
				width,
				paddingBottom: undefined,
			});
		}
	}, [image_data, window_width, window_height]);

	const goLeft = () => {
		if (direction) return;

		setDirection("left");
		setImageIndex(index => {
			return index === 0 ? images_data.length - 1 : index - 1;
		});
	};

	const goRight = () => {
		if (direction) return;

		setDirection("right");
		setImageIndex(index => {
			return index === images_data.length - 1 ? 0 : index + 1;
		});
	};

	if (!image_data) {
		return null;
	}

	return (
		<div
			className={styles.container}
			onClick={event => {
				if (event.clientX < window.innerWidth * 0.5) {
					goLeft();
				} else if (event.clientX > window.innerWidth * 0.5) {
					goRight();
				}
			}}
		>
			<Navigation
				closeModal={closeModal}
				goLeft={goLeft}
				goRight={goRight}
			/>

			<div ref={$content} className={styles.content}>
				<ImageWithContainer
					key={image_data.src}
					className={{
						container: [
							styles.image_container,
							...(direction
								? [styles[`direction_${direction}`]]
								: []),
						].join(" "),
					}}
					style={{ container: image_style }}
					attributes={{
						container: { onAnimationEnd: () => setDirection(null) },
					}}
					src={image_data.src}
					srcSet={image_data.src_set}
					data-width={image_data.width}
					data-height={image_data.height}
					sizes="100vw"
				/>
			</div>
		</div>
	);
};

export const Modal: FunctionComponent<ModalProps> = props => {
	return (
		<Fragment>
			{createPortal(<ModalContent {...props} />, document.body)}
		</Fragment>
	);
};
