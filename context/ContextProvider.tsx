import React, { FunctionComponent, useState, useEffect, useRef } from "react";

import { Context } from "./Context";
import { useWindowSize } from "@utils";
import { layouts } from "@layouts";

interface Props {
	layout_name?: string;
	url_path: string;
}

export const ContextProvider: FunctionComponent<Props> = props => {
	const { layout_name, url_path } = props;

	const { window_width } = useWindowSize();

	const layout = useRef(
		layouts.find(({ name }) => name === layout_name) || layouts[0]
	);

	const breakpoint_width = useRef(layout.current.breakpoint);

	const [is_mobile, setIsMobile] = useState(
		window_width < breakpoint_width.current
	);

	useEffect(() => {
		setIsMobile(window_width < breakpoint_width.current);
	}, [window_width]);

	return (
		<Context.Provider
			value={{
				is_mobile,
				url_path,
				layout: layout.current,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
