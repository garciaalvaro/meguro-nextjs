import React from "react";
import type { FunctionComponent } from "react";
import type { AppProps } from "next/app";

import "../styles/index.sass";

// If there are custom styles import them
if (process.env.custom_css_file) {
	require(process.env.custom_css_file);
}

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
	return <Component {...pageProps} />;
};

export default App;
