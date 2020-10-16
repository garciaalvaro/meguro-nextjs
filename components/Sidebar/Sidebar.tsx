import React, { FunctionComponent, useRef, useState, useEffect } from "react";

import styles from "./Sidebar.styl";
import { List } from "./List";

export const Sidebar: FunctionComponent = () => {
	const sidebar_background_color = process.env.sidebar_background_color;
	const [is_open, setIsOpen] = useState(false);
	const [is_opening, setIsOpening] = useState(false);
	const [is_closing, setIsClosing] = useState(false);
	const $overlay = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!$overlay.current) return;

		$overlay.current.addEventListener("transitionend", () =>
			setIsClosing(false)
		);

		$overlay.current.addEventListener("animationend", () =>
			setIsOpening(false)
		);
	}, []);

	const className = [
		styles.container,
		is_open ? styles.is_open : styles["no-is_open"],
		...(is_opening ? [styles.is_opening] : []),
		...(is_closing ? [styles.is_closing] : []),
	].join(" ");

	return (
		<nav
			className={className}
			onClick={() => {
				if (is_opening || is_closing) return;

				setIsOpen(!is_open);

				if (is_open) {
					setIsClosing(true);
				} else {
					setIsOpening(true);
				}
			}}
		>
			<div
				ref={$overlay}
				className={styles.overlay}
				style={{ backgroundColor: sidebar_background_color }}
			></div>

			<div className={styles.list_container}>
				<List />
			</div>
		</nav>
	);
};
