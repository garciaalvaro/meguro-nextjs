import React, { FunctionComponent } from "react";

import { Column } from "@/Column";
import { Container } from "@/Container";
import { Props as StylesProps } from "@utils/useStyles";

const Column1: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return (
		<Column
			min_width={400}
			max_width={600}
			padding={50}
			padding_top={90}
			child_separation={25}
			background_color="#b4b9bf"
			{...props}
		/>
	);
};

const Column1Mobile: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return (
		<Container
			padding={40}
			padding_top={140}
			padding_bottom={80}
			background_color="#cdd2d8"
			{...props}
		/>
	);
};

const Column2: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return <Column {...props} />;
};

const Column2Mobile: FunctionComponent<StylesProps> = props => {
	return (
		<Container padding={10} child_separation={10}>
			{props.children}
		</Container>
	);
};

export const meguro_1: Layout = {
	name: "meguro_1",
	breakpoint: 800,
	components_desktop: {
		Column1,
		Column2,
	},
	components_mobile: {
		Column1: Column1Mobile,
		Column2: Column2Mobile,
	},
};
