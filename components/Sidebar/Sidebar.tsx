import React, { useState, useRef, useEffect, useContext } from "react";
import type { FunctionComponent } from "react";
import Scrollbar from "react-scrollbars-custom";

import { useIsCollapsed, useIsFirstRender } from "@hooks";
import { className } from "@utils";
import { Context } from "@context";
import { List } from "./List";
import styles from "./Sidebar.styl";

export const Sidebar: FunctionComponent = () => {
	const { scrollbar_width, is_one_column } = useContext(Context);
	const [is_open, setIsOpen] = useState(false);
	const [is_opening, setIsOpening] = useState(false);
	const [is_closing, setIsClosing] = useState(false);
	const is_mobile = useIsCollapsed(600);
	const is_first_render = useIsFirstRender();
	const $scroller = useRef<Scrollbar | null>(null);

	const toggle = () => {
		if (is_opening || is_closing) return;

		setIsOpen(!is_open);

		if (is_open) {
			setIsClosing(true);
		} else {
			setIsOpening(true);
		}
	};

	useEffect(() => {
		if (!is_one_column) return;

		if (is_open || is_closing) {
			document.body.style.setProperty(
				"--scrollbar_offset",
				`${scrollbar_width}px`
			);
			document.body.style.setProperty("overflow", "hidden");
		} else {
			document.body.style.setProperty("--scrollbar_offset", "");
			document.body.style.setProperty("overflow", "");
		}
	}, [is_one_column, is_open, is_closing, scrollbar_width]);

	return (
		<nav
			className={className({
				[styles.container]: true,
				[styles.is_open]: is_open,
				[styles.is_closed]: !is_open,
				[styles.is_opening]: is_opening,
				[styles.is_closing]: is_closing,
			})}
			onClick={toggle}
			aria-expanded={is_open}
			data-testid="sidebar"
		>
			<div
				className={styles.overlay}
				onTransitionEnd={() => {
					setIsClosing(false);
					setIsOpening(false);
				}}
				onAnimationEnd={() => {
					setIsClosing(false);
					setIsOpening(false);
				}}
				data-testid="sidebar_overlay"
			></div>

			<div
				className={className({
					[styles.list_container]: true,
					[styles.can_scroll]:
						(!is_first_render && !is_mobile) ||
						(!is_closing && !is_opening && is_open),
				})}
			>
				{is_first_render || is_mobile ? (
					<List />
				) : (
					<Scrollbar
						// @ts-expect-error TODO
						ref={($el: Scrollbar) => {
							$scroller.current = $el;
						}}
						noScrollX={true}
						removeTrackXWhenNotUsed={true}
						disableTracksWidthCompensation={true}
						trackYProps={{ className: styles.scrollbar }}
					>
						<List $scroller={$scroller} />
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
