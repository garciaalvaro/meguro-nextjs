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
			padding={50}
			padding_top={90}
			padding_bottom={90}
			child_separation={25}
			background_color="#b4b9bf"
			{...props}
		/>
	);
};

const Column2: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return <Column padding={5} child_separation={5} {...props} />;
};

const Column2Mobile: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return <Container padding={5} child_separation={5} {...props} />;
};

export const meguro_1: Layout = {
	name: "meguro_1",
	breakpoint: 700,
	components_desktop: { Column1, Column2 },
	components_mobile: { Column1: Column1Mobile, Column2: Column2Mobile },
};
