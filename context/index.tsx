import React, {
	FunctionComponent,
	useState,
	useEffect,
	createContext,
} from "react";

import { useWindowSize } from "@utils";

interface Props {
	is_mobile: boolean;
}

export const Context = createContext<Props>({
	is_mobile: false,
});

export const ContextProvider: FunctionComponent = props => {
	const { window_width } = useWindowSize();
	const [is_mobile, setIsMobile] = useState(window_width < 600);

	useEffect(() => {
		setIsMobile(window_width < 600);
	}, [window_width]);

	return (
		<Context.Provider
			value={{
				is_mobile,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
