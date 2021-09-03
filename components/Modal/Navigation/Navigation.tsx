import React, { useEffect } from "react";
import type { FunctionComponent } from "react";

import styles from "./navigation.module.sass";

export interface ModalProps {
	closeModal: () => void;
	goLeft: () => void;
	goRight: () => void;
}

export const Navigation: FunctionComponent<ModalProps> = props => {
	const { closeModal, goLeft, goRight } = props;

	useEffect(() => {
		const keyDownHandler = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				closeModal();
			} else if (event.key === "ArrowLeft" || event.key === "a") {
				// TODO: This function is set on the first render,
				// so it doesnt consider if the transition is running.
				goLeft();
			} else if (event.key === "ArrowRight" || event.key === "d") {
				goRight();
			}
		};

		document.addEventListener("keydown", keyDownHandler);

		return () => document.removeEventListener("keydown", keyDownHandler);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<nav className={styles.container}>
			<button
				className={[styles.button, styles.button_right].join(" ")}
				onClick={event => {
					event.stopPropagation();

					goLeft();
				}}
				data-testid="modal_navigation_left"
				aria-label="Previous image"
			>
				{/* https://material.io/tools/icons/?icon=chevron_left */}
				<svg width="24" height="24" viewBox="0 0 24 24">
					<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
					<path d="M0 0h24v24H0z" fill="none" />
				</svg>
			</button>

			<button
				className={[styles.button, styles.button_left].join(" ")}
				onClick={event => {
					event.stopPropagation();

					goRight();
				}}
				data-testid="modal_navigation_right"
				aria-label="Next image"
			>
				{/* https://material.io/tools/icons/?icon=chevron_right */}
				<svg width="24" height="24" viewBox="0 0 24 24">
					<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
					<path d="M0 0h24v24H0z" fill="none" />
				</svg>
			</button>

			<button
				className={[styles.button, styles.button_close].join(" ")}
				onClick={closeModal}
				data-testid="modal_navigation_close"
				aria-label="Close modal"
			>
				<svg width="24" height="24" viewBox="0 0 24 24">
					<path
						d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
						style={{
							transform: "translateX(-3px)",
						}}
					/>
					<path
						d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
						style={{
							transform: "translateX(2px)",
						}}
					/>
				</svg>
			</button>
		</nav>
	);
};
