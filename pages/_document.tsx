import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";

class MyDocument extends Document {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	render() {
		return (
			<Html lang={process.env.lang}>
				<Head />

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
