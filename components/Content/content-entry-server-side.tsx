import React, { useContext, useRef } from "react";
import type { ComponentType, FunctionComponent } from "react";
import dynamic from "next/dynamic";

import { Context } from "@context";

export const ContentEntryServerSide: FunctionComponent = () => {
	const { file_path } = useContext(Context);

	const Entry = useRef<ComponentType>(
		dynamic(() => import(`${process.env.pages_dir}/${file_path}`))
	).current;

	return <Entry />;
};
