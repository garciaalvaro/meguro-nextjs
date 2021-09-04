import React, {
	useRef,
	useState,
	useEffect,
	useLayoutEffect,
	useContext,
} from "react";
import type { CSSProperties, FunctionComponent } from "react";
import Scrollbar from "react-scrollbars-custom";

import styles from "./column.module.sass";
import container_styles from "../container/container.module.sass";
import { Modal, ModalProps } from "@components/modal";
import { useIsCollapsed } from "@hooks";
import { className } from "@utils";
import { Context } from "@context";

interface Props {
	className_container?: string;
	className_content?: string;
	breakpoint?: number;
	style?: CSSProperties;
	use_modal?: boolean;
	modal_max_width?: number;
}

export const Column: FunctionComponent<Props> = props => {
	const { breakpoint, children, use_modal, modal_max_width, style } = props;

	const $container = useRef<HTMLDivElement | null>(null);

	const { setIsOneColumn } = useContext(Context);

	const [images_data, setImagesData] = useState<ModalProps["images_data"]>(
		[]
	);

	const [modal_initial_src, setModalInitialSrc] =
		useState<ModalProps["initial_src"]>("");

	const [modal_is_open, setModalIsOpen] = useState(false);

	const is_collapsed = useIsCollapsed(breakpoint);

	const className_container = className(
		styles.container,
		...(props.className_container ? [props.className_container] : []),
		...(use_modal ? [styles.use_modal] : [])
	);

	const className_content = className(
		styles.content,
		...(props.className_content ? [props.className_content] : [])
	);

	useEffect(() => {
		setIsOneColumn(is_collapsed);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [is_collapsed]);

	useEffect(() => {
		if (!use_modal || !$container.current) return;

		const $images = $container.current.querySelectorAll("img");

		const images_data = [...$images].map($el => {
			let max_width;

			if (
				$el.parentElement?.parentElement?.classList.contains(
					container_styles.container
				)
			) {
				max_width =
					$el.parentElement.parentElement.style.maxWidth || undefined;

				max_width = max_width
					? Number(max_width.replace(/px$/, "").replace(/rem$/, "0"))
					: undefined;
			}

			return {
				src: $el.src,
				src_set: $el.srcset,
				width: Number($el.dataset.width),
				height: Number($el.dataset.height),
				max_width,
			};
		});

		setImagesData(images_data);

		const openModal = (event: Event) => {
			const $target = event.target as HTMLImageElement;

			if ($target.nodeName !== "IMG") return;

			setModalInitialSrc($target.src);
			setModalIsOpen(true);
		};

		$container.current.addEventListener("click", openModal);

		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			$container.current?.removeEventListener("click", openModal);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useLayoutEffect(() => {
		if (is_collapsed) {
			document.body.classList.add(styles.can_scroll);
		} else {
			document.body.classList.remove(styles.can_scroll);
		}
	}, [is_collapsed]);

	return (
		<div ref={$container} className={className_container} style={style}>
			{modal_is_open && (
				<Modal
					max_width={modal_max_width}
					images_data={images_data}
					initial_src={modal_initial_src}
					closeModal={() => setModalIsOpen(false)}
				/>
			)}

			{is_collapsed ? (
				<div className={className_content}>{children}</div>
			) : (
				<Scrollbar
					noScrollX={true}
					removeTrackXWhenNotUsed={true}
					disableTracksWidthCompensation={true}
					trackYProps={{ className: styles.scrollbar }}
				>
					<div className={className_content} data-testid="column">
						{children}
					</div>
				</Scrollbar>
			)}
		</div>
	);
};
