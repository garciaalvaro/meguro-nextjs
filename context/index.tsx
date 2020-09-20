import React, {
	FunctionComponent,
	useState,
	useEffect,
	createContext,
} from "react";

import { useWindowSize } from "@utils";

interface ContextProps {
	is_mobile: boolean;
	url_path: string;
}

interface Props {
	breakpoint_width: number;
	url_path: string;
}

export const Context = createContext<ContextProps>({
	is_mobile: false,
	url_path: "",
});

export const ContextProvider: FunctionComponent<Props> = props => {
	const { breakpoint_width, url_path } = props;
	const { window_width } = useWindowSize();
	const [is_mobile, setIsMobile] = useState(window_width < breakpoint_width);

	useEffect(() => {
		setIsMobile(window_width < breakpoint_width);
	}, [window_width]);

	return (
		<Context.Provider
			value={{
				is_mobile,
				url_path,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
