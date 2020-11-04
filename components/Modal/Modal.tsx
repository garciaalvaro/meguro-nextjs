import React, { Fragment, FunctionComponent, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.styl";
import { Navigation } from "./Navigation";

export interface ModalProps {
	data: {
		src: string;
		srcset?: string;
	}[];

	initial_src: string;

	closeModal: () => void;
}

export const ModalContent: FunctionComponent<ModalProps> = props => {
	const { data, initial_src, closeModal } = props;

	const [direction, setDirection] = useState<"left" | "right" | null>(null);

	const [image_index, setImageIndex] = useState(
		(() => {
			const index = data.findIndex(image => image.src === initial_src);

			return index < 0 ? 0 : index;
		})()
	);

	const goLeft = () => {
		setDirection("left");
		setImageIndex(index => {
			return index === 0 ? data.length - 1 : index - 1;
		});
	};

	const goRight = () => {
		setDirection("right");
		setImageIndex(index => {
			return index === data.length - 1 ? 0 : index + 1;
		});
	};

	const image = data[image_index];

	if (!image) {
		return null;
	}

	return (
		<div
			className={styles.container}
			onClick={event => {
				if (event.clientX < window.innerWidth * 0.45) {
					goLeft();
				} else if (event.clientX > window.innerWidth * 0.55) {
					goRight();
				}
			}}
		>
			<Navigation
				closeModal={closeModal}
				goLeft={goLeft}
				goRight={goRight}
			/>

			<img
				className={[
					styles.image,
					...(direction ? [styles[`direction_${direction}`]] : []),
				].join(" ")}
				key={image.src}
				src={image.src}
				srcSet={image.srcset}
				onAnimationEnd={() => setDirection(null)}
			/>
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
