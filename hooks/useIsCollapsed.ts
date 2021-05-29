import { useState, useEffect } from "react";

import { useWindowSize } from "./useWindowSize";

export const useIsCollapsed = (breakpoint = 0): boolean => {
	const { window_width } = useWindowSize();

	const [is_collapsed, setIsCollapsed] = useState(window_width < breakpoint);

	useEffect(() => {
		setIsCollapsed(window_width < breakpoint);
	}, [window_width, breakpoint]);

	return is_collapsed;
};
