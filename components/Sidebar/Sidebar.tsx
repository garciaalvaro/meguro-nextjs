import React, { FunctionComponent, useRef, useState, useEffect } from "react";
import Scrollbar from "react-scrollbars-custom";

import { useIsMobile, useIsFirstRender } from "@hooks";
import { List } from "./List";
import styles from "./Sidebar.styl";

export const Sidebar: FunctionComponent = () => {
	const [is_open, setIsOpen] = useState(false);
	const [is_opening, setIsOpening] = useState(false);
	const [is_closing, setIsClosing] = useState(false);
	const $overlay = useRef<HTMLDivElement | null>(null);
	const is_mobile = useIsMobile(600);
	const is_first_render = useIsFirstRender();

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
		is_open ? styles.is_open : styles.is_closed,
		...(is_opening ? [styles.is_opening] : []),
		...(is_closing ? [styles.is_closing] : []),
	].join(" ");

	const toggle = () => {
		if (is_opening || is_closing) return;

		setIsOpen(!is_open);

		if (is_open) {
			setIsClosing(true);
		} else {
			setIsOpening(true);
		}
	};

	return (
		<nav className={className} onClick={toggle}>
			<div ref={$overlay} className={styles.overlay}></div>

			<div className={styles.list_container}>
				{is_first_render || is_mobile ? (
					<List />
				) : (
					<Scrollbar
						noScrollX={true}
						removeTrackXWhenNotUsed={true}
						disableTracksWidthCompensation={true}
						trackYProps={{ className: styles.scrollbar }}
					>
						<List />
					</Scrollbar>
				)}
			</div>

			<button className={styles.button} onClick={toggle}>
				{is_open ? (
					/* https://material.io/tools/icons/?icon=close */
					<svg width="22" height="22" viewBox="0 0 24 24">
						<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
						<path d="M0 0h24v24H0z" fill="none" />
					</svg>
				) : (
					/* https://material.io/tools/icons/?icon=menu */
					<svg width="26" height="26" viewBox="0 0 24 24">
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
					</svg>
				)}
			</button>
		</nav>
	);
};
