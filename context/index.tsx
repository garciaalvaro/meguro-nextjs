import React, {
	FunctionComponent,
	useState,
	useEffect,
	createContext,
} from "react";

import { useWindowSize } from "@utils";

interface ContextProps {
	is_mobile: boolean;
}

interface Props {
	breakpoint_width: number;
}

export const Context = createContext<ContextProps>({
	is_mobile: false,
});

export const ContextProvider: FunctionComponent<Props> = props => {
	const { breakpoint_width } = props;
	const { window_width } = useWindowSize();
	const [is_mobile, setIsMobile] = useState(window_width < breakpoint_width);

	useEffect(() => {
		setIsMobile(window_width < breakpoint_width);
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
