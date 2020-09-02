import React, { FunctionComponent } from "react";

import { Props } from "@utils/useStyles";
import { Container } from "@/Container";

export const Column: FunctionComponent<Props> = props => {
	return <Container {...props} type="column" />;
};
