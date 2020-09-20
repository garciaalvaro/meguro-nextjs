import React, { FunctionComponent, useState, useEffect } from "react";

import { Context } from "./Context";
import { useWindowSize } from "@utils";

interface Props {
	url_path: string;
}

export const ContextProvider: FunctionComponent<Props> = props => {
	const { url_path } = props;
	const { window_width } = useWindowSize();
	const [breakpoint_width, setBreakingPoint] = useState(0);
	const [is_mobile, setIsMobile] = useState(window_width < breakpoint_width);

	useEffect(() => {
		setIsMobile(window_width < breakpoint_width);
	}, [window_width, breakpoint_width]);

	return (
		<Context.Provider
			value={{
				setBreakingPoint,
				is_mobile,
				url_path,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
