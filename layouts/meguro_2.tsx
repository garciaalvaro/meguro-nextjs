import React, { Fragment, FunctionComponent } from "react";

import { Column } from "@/Column";
import { Container } from "@/Container";
import { Props as StylesProps } from "@utils/useStyles";

const Column1: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return (
		<Column
			padding_top={80}
			padding_bottom={80}
			padding_left={80}
			padding_right={80}
			content_max_width={550}
			content_align="center"
			child_separation={80}
			background_color="#41474a"
			{...props}
		/>
	);
};

const Column1Mobile: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return (
		<Container
			child_separation={5}
			padding={5}
			background_color="#41474a"
			{...props}
		/>
	);
};

const Column2: FunctionComponent<StylesProps> = (props: StylesProps) => {
	return <Column {...props} />;
};

const Column2Mobile: FunctionComponent<StylesProps> = props => {
	return <Fragment>{props.children}</Fragment>;
};

const ContainerTitle: FunctionComponent<StylesProps> = props => {
	return (
		<Container
			padding={50}
			padding_top={150}
			child_separation={25}
			content_max_width={500}
			content_align="center"
			background_color="#c3c4c5"
		>
			{props.children}
		</Container>
	);
};

const ContainerTitleMobile: FunctionComponent<StylesProps> = props => {
	return (
		<Container
			order={-1}
			padding={50}
			padding_top={100}
			child_separation={25}
			content_max_width={500}
			content_align="center"
			background_color="#c3c4c5"
		>
			{props.children}
		</Container>
	);
};

const ContainerDescription: FunctionComponent<StylesProps> = props => {
	return (
		<Container
			padding_left={50}
			padding_right={50}
			padding_bottom={50}
			child_separation={25}
			content_max_width={500}
			content_align="center"
			background_color="#c3c4c5"
		>
			{props.children}
		</Container>
	);
};

const ContainerDescriptionMobile: FunctionComponent<StylesProps> = props => {
	return (
		<Container
			padding={50}
			child_separation={25}
			content_max_width={500}
			content_align="center"
			background_color="#c3c4c5"
		>
			{props.children}
		</Container>
	);
};

export const meguro_2: Layout = {
	name: "meguro_2",
	breakpoint: 800,
	components_desktop: {
		Column1,
		Column2,
		ContainerTitle,
		ContainerDescription,
	},
	components_mobile: {
		Column1: Column1Mobile,
		Column2: Column2Mobile,
		ContainerTitle: ContainerTitleMobile,
		ContainerDescription: ContainerDescriptionMobile,
	},
};
