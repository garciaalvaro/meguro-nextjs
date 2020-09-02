import React, { Fragment, FunctionComponent } from "react";

import { Column } from "@/Column";

interface Props {
	Header: FunctionComponent;
	Description: FunctionComponent;
	Images: FunctionComponent;
}

export const LayoutExample1: FunctionComponent<Props> = props => {
	const { Header, Description, Images } = props;

	return (
		<Fragment>
			<Column
				min_width={400}
				max_width={600}
				padding={50}
				padding_top={90}
				child_separation={25}
				background_color="#b4b9bf"
			>
				<Header />
				<hr />
				<Description />
			</Column>

			<Column>
				<Images />
			</Column>
		</Fragment>
	);
};
