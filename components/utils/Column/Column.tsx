import React, { useRef, useState, useEffect } from "react";
import type { CSSProperties, FunctionComponent } from "react";
import Scrollbar from "react-scrollbars-custom";

import styles from "./Column.styl";
import { Modal, ModalProps } from "@components/Modal";
import { useIsMobile } from "@hooks";

interface Props {
	className_container?: string;
	className_content?: string;
	breakpoint?: number;
	style?: CSSProperties;
	use_modal?: boolean;
}

export const Column: FunctionComponent<Props> = props => {
	const { breakpoint, children, use_modal, style } = props;

	const $container = useRef<HTMLDivElement | null>(null);

	const [images_data, setImagesData] = useState<ModalProps["images_data"]>(
		[]
	);

	const [modal_initial_src, setModalInitialSrc] = useState<
		ModalProps["initial_src"]
	>("");

	const [modal_is_open, setModalIsOpen] = useState(false);

	const is_mobile = useIsMobile(breakpoint);

	const className_container = [
		styles.container,
		...(props.className_container ? [props.className_container] : []),
		...(use_modal ? [styles.use_modal] : []),
	].join(" ");

	const className_content = [
		styles.content,
		...(props.className_content ? [props.className_content] : []),
	].join(" ");

	useEffect(() => {
		if (!use_modal || !$container.current) return;

		const $images = $container.current.querySelectorAll("img");

		const images_data = [...$images].map($el => ({
			src: $el.src,
			src_set: $el.srcset,
			width: Number($el.dataset.width),
			height: Number($el.dataset.height),
			modal_width: $el.dataset.modal_width
				? Number($el.dataset.modal_width)
				: undefined,
		}));

		setImagesData(images_data);

		const openModal = (event: Event) => {
			const $target = event.target as HTMLImageElement;

			if ($target.nodeName !== "IMG") return;

			setModalInitialSrc($target.src);
			setModalIsOpen(true);
		};

		$container.current.addEventListener("click", openModal);

		return () =>
			$container.current?.removeEventListener("click", openModal);
	}, []);

	return (
		<div ref={$container} className={className_container} style={style}>
			{modal_is_open && (
				<Modal
					images_data={images_data}
					initial_src={modal_initial_src}
					closeModal={() => setModalIsOpen(false)}
				/>
			)}

			{is_mobile ? (
				<div className={className_content}>{children}</div>
			) : (
				<Scrollbar
					noScrollX={true}
					removeTrackXWhenNotUsed={true}
					disableTracksWidthCompensation={true}
					trackYProps={{ className: styles.scrollbar }}
				>
					<div className={className_content}>{children}</div>
				</Scrollbar>
			)}
		</div>
	);
};
