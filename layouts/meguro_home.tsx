import React, { FunctionComponent } from "react";

import { Column } from "@/Column";
import { Container } from "@/Container";
import { Props as StylesProps } from "@utils/useStyles";

const Column1: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return (
		<Column
			min_width={400}
			padding_top={120}
			padding_bottom={50}
			padding_left={50}
			child_separation={25}
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
			child_separation={25}
			{...props}
		/>
	);
};

const Column2: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return <Column padding={70} {...props} />;
};

const Column2Mobile: FunctionComponent<StylesProps> = props => {
	return (
		<Container
			padding_left={40}
			padding_right={0}
			padding_bottom={0}
			child_separation={25}
		>
			{props.children}
		</Container>
	);
};

export const meguro_home: Layout = {
	name: "meguro_home",
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
