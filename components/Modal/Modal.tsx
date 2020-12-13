import React, {
	Fragment,
	FunctionComponent,
	useState,
	useEffect,
	useRef,
} from "react";
import { createPortal } from "react-dom";

import { Image, ResponsiveLoader } from "../Image";
import { useWindowSize } from "@utils/useWindowSize";
import { Navigation } from "./Navigation";
import styles from "./Modal.styl";

export interface ModalProps {
	data: string[];
	initial_src: string;
	closeModal: () => void;
}

export const ModalContent: FunctionComponent<ModalProps> = props => {
	const { data, initial_src, closeModal } = props;

	const [direction, setDirection] = useState<"left" | "right" | null>(null);

	const [image_data, setImageData] = useState<ResponsiveLoader | null>(null);

	const $content = useRef<HTMLDivElement | null>(null);

	const [image_style, setImageStyle] = useState({});

	const { window_width, window_height } = useWindowSize();

	const [image_index, setImageIndex] = useState(
		(() => {
			const index = data.findIndex(src => src === initial_src);

			return index < 0 ? 0 : index;
		})()
	);

	useEffect(() => {
		if (!image_data || !$content.current) return;

		const container_ratio =
			$content.current.clientWidth / $content.current.clientHeight;

		if (container_ratio > image_data.ratio) {
			setImageStyle({
				height: "100%",
				width: 0,
				paddingLeft: `${100 * (image_data.ratio / container_ratio)}%`,
				paddingBottom: undefined,
			});
		} else {
			setImageStyle({});
		}
	}, [image_data, window_width, window_height]);

	const goLeft = () => {
		if (direction) return;

		setDirection("left");
		setImageIndex(index => {
			return index === 0 ? data.length - 1 : index - 1;
		});
	};

	const goRight = () => {
		if (direction) return;

		setDirection("right");
		setImageIndex(index => {
			return index === data.length - 1 ? 0 : index + 1;
		});
	};

	const image_src = data[image_index];

	if (!image_src) {
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
				<Image
					key={image_src}
					setImageData={setImageData}
					sizes="100vw"
					className_container={[
						styles.image_container,
						...(direction
							? [styles[`direction_${direction}`]]
							: []),
					].join(" ")}
					src={image_src}
					style_image={image_style}
					onAnimationEnd={() => setDirection(null)}
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
