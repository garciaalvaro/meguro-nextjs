import { useIsMobile } from "@utils";
import React, { FunctionComponent } from "react";
import Scrollbar from "react-scrollbars-custom";

import styles from "./Column.styl";

interface Props {
	className_container?: string;
	className_content?: string;
	breakpoint?: number;
}

export const Column: FunctionComponent<Props> = props => {
	const className_container = [
		styles.container,
		...(props.className_container ? [props.className_container] : []),
	].join(" ");

	const className_content = [
		styles.content,
		...(props.className_content ? [props.className_content] : []),
	].join(" ");

	const is_mobile = useIsMobile(props.breakpoint);

	if (is_mobile) {
		return (
			<div className={className_container}>
				<div className={className_content}>{props.children}</div>
			</div>
		);
	}

	return (
		<Scrollbar
			className={className_container}
			noScrollX={true}
			removeTrackXWhenNotUsed={true}
			disableTracksWidthCompensation={true}
			trackYProps={{ className: styles.scrollbar }}
		>
			<div className={className_content}>{props.children}</div>
		</Scrollbar>
	);
};
