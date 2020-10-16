import { useState, useEffect } from "react";

import { useWindowSize } from "./useWindowSize";

export const useIsMobile = (breakpoint: number): boolean => {
	const { window_width } = useWindowSize();
	const [is_mobile, setIsMobile] = useState(window_width < breakpoint);

	useEffect(() => {
		setIsMobile(window_width < breakpoint);
	}, [window_width, breakpoint]);

	return is_mobile;
};
