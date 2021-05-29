import { useState, useEffect } from "react";

import { useWindowSize } from "./useWindowSize";

export const useIsCollapsed = (breakpoint?: number): boolean => {
	const { window_width } = useWindowSize();

	const [is_collapsed, setIsCollapsed] = useState(
		window_width < (breakpoint || 0)
	);

	useEffect(() => {
		setIsCollapsed(window_width < (breakpoint || 0));
	}, [window_width, breakpoint]);

	return is_collapsed;
};
