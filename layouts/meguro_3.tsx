import React, { FunctionComponent } from "react";

import { Column } from "@/Column";
import { Container } from "@/Container";
import { Props as StylesProps } from "@utils/useStyles";

const Column1: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return (
		<Column
			min_width={400}
			padding={50}
			padding_top={150}
			child_separation={25}
			color="rgba(255,255,255,0.9)"
			background_color="#4f5356"
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
			color="rgba(255,255,255,0.9)"
			background_color="#4f5356"
			{...props}
		/>
	);
};

const Column2: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return (
		<Column
			padding={40}
			child_separation={40}
			background_color="#e5ebec"
			{...props}
		/>
	);
};

const Column2Mobile: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return <Container padding={40} child_separation={40} {...props} />;
};

const Column3: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return (
		<Column
			padding={40}
			child_separation={40}
			background_color="#e5ebec"
			{...props}
		/>
	);
};

const Column3Mobile: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return (
		<Container
			padding_bottom={40}
			padding_left={40}
			padding_right={40}
			child_separation={40}
			{...props}
		/>
	);
};

export const meguro_3: Layout = {
	name: "meguro_3",
	breakpoint: 700,
	components_desktop: { Column1, Column2, Column3 },
	components_mobile: {
		Column1: Column1Mobile,
		Column2: Column2Mobile,
		Column3: Column3Mobile,
	},
};
