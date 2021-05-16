import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";

interface WindowSize {
	is_resizing: boolean;
	window_width: number;
	window_height: number;
}

// Due to SSR we can only use window or document after mount
export const useWindowSize = (time = 300): WindowSize => {
	const [width, setWidth] = useState(
		typeof window !== "undefined" ? window.innerWidth : 1
	);

	const [height, setHeight] = useState(
		typeof window !== "undefined" ? window.innerHeight : 1
	);

	const [is_resizing, setIsResizing] = useState(false);

	useEffect(() => {
		const resizeThrottle = throttle(
			() => {
				setWidth(window.innerWidth);
				setHeight(window.innerHeight);
			},
			time,
			{
				leading: true,
				trailing: true,
			}
		);

		const resizeDebounce = debounce(
			() => setIsResizing(is_resizing => !is_resizing),
			2 * time,
			{
				leading: true,
				trailing: true,
			}
		);

		window.addEventListener("resize", resizeThrottle);
		window.addEventListener("resize", resizeDebounce);

		return () => {
			resizeThrottle.cancel();
			window.removeEventListener("resize", resizeThrottle);

			resizeDebounce.cancel();
			window.removeEventListener("resize", resizeDebounce);
		};
	}, [time]);

	return { window_width: width, window_height: height, is_resizing };
};
