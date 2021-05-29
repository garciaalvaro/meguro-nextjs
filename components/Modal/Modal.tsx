import React, {
	Fragment,
	useState,
	useMemo,
	useRef,
	useEffect,
	useContext,
} from "react";
import type { FunctionComponent, CSSProperties } from "react";
import { createPortal } from "react-dom";

import { ImageWithContainer } from "../utils";
import { useIsFirstRender, useWindowSize } from "@hooks";
import { Context } from "@context";
import { Navigation } from "./Navigation";
import styles from "./Modal.styl";

interface ImageData {
	src: string;
	src_set: string;
	width: number;
	height: number;
	max_width?: number;
}

export interface ModalProps {
	images_data: ImageData[];
	initial_src: string;
	closeModal: () => void;
	max_width?: number;
}

export const ModalContent: FunctionComponent<ModalProps> = props => {
	const { images_data, initial_src, closeModal, max_width } = props;

	const { scrollbar_width, is_one_column } = useContext(Context);

	const [direction, setDirection] = useState<"left" | "right" | null>(null);

	const $content = useRef<HTMLDivElement | null>(null);

	const { window_width, window_height } = useWindowSize();

	const is_first_render = useIsFirstRender();

	const [image_index, setImageIndex] = useState(
		(() => {
			const index = images_data.findIndex(
				({ src }) => src === initial_src
			);

			return index < 0 ? 0 : index;
		})()
	);

	const image_data = useMemo(
		() => images_data[image_index],
		[images_data, image_index]
	);

	const image_style = useMemo<CSSProperties | undefined>(() => {
		if (!image_data || !$content.current) {
			return {};
		}

		const container_ratio =
			$content.current.clientWidth / $content.current.clientHeight;

		const image_ratio = image_data.width / image_data.height;

		if (container_ratio > image_ratio) {
			const height = Math.min(
				$content.current.clientHeight,
				Math.min(
					image_data.max_width || Infinity,
					max_width || Infinity,
					image_data.width || Infinity
				) / image_ratio
			);

			return {
				height,
				width: height * image_ratio,
				paddingBottom: undefined,
			};
		}

		const width = Math.min(
			$content.current.clientWidth,
			Math.min(
				image_data.max_width || Infinity,
				max_width || Infinity,
				image_data.width || Infinity
			)
		);

		return {
			height: width / image_ratio,
			width,
			paddingBottom: undefined,
		};

		// TODO: Improve logic of useMemo & ref
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [is_first_render, image_data, window_width, window_height]);

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

	useEffect(() => {
		if (!is_one_column) return;

		document.body.style.setProperty(
			"--scrollbar_offset",
			`${scrollbar_width}px`
		);
		document.body.style.setProperty("overflow", "hidden");

		return () => {
			document.body.style.setProperty("--scrollbar_offset", "");
			document.body.style.setProperty("overflow", "");
		};
	}, [is_one_column, scrollbar_width]);

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
			data-testid="modal"
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
						is_loading: styles.is_loading,
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
