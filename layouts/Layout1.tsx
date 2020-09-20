import React, {
	Fragment,
	FunctionComponent,
	useContext,
	useEffect,
} from "react";

import { Column } from "@/Column";
import { Container } from "@/Container";
import { Context } from "@context";

interface Props {
	ColumnText: FunctionComponent | FunctionComponent[];
	ColumnImages: FunctionComponent | FunctionComponent[];
}

export const Layout1: FunctionComponent<Props> = props => {
	const { ColumnText, ColumnImages } = props;

	const { is_mobile, setBreakingPoint } = useContext(Context);

	const column_text: FunctionComponent[] = Array.isArray(ColumnText)
		? ColumnText
		: [ColumnText];

	const column_images: FunctionComponent[] = Array.isArray(ColumnImages)
		? ColumnImages
		: [ColumnImages];

	useEffect(() => {
		setBreakingPoint(800);
	}, []);

	if (is_mobile) {
		return (
			<Column>
				<Container
					padding={50}
					padding_top={90}
					padding_bottom={90}
					child_separation={25}
					background_color="#b4b9bf"
				>
					{column_text.map((Component, index) => (
						<Component key={index} />
					))}
				</Container>

				<Container padding={5} child_separation={5}>
					{column_images.map((Component, index) => (
						<Component key={index} />
					))}
				</Container>
			</Column>
		);
	}

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
				{column_text.map((Component, index) => (
					<Component key={index} />
				))}
			</Column>

			<Column>
				{column_images.map((Component, index) => (
					<Component key={index} />
				))}
			</Column>
		</Fragment>
	);
};
