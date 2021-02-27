import { useState, useEffect } from "react";

export const useIsFirstRender = (): boolean => {
	const [is_first_render, setIsFirstRender] = useState(true);

	useEffect(() => {
		setIsFirstRender(false);
	}, []);

	return is_first_render;
};
