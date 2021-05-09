import React, { useContext, useEffect, useRef } from "react";
import type { FunctionComponent } from "react";

import { Context } from "@context";
import { className } from "@utils";
import styles from "./Main.styl";

interface Props {
	is_home?: boolean;
}

export const Main: FunctionComponent<Props> = props => {
	const { md_is_loading } = useContext(Context);
	const $main = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!$main.current) return;

		$main.current.scrollTop = 0;
	}, [md_is_loading]);

	return (
		<main
			ref={$main}
			className={className(
				styles.container,
				props.is_home ? styles.is_home : null
			)}
		>
			{props.children}
		</main>
	);
};
