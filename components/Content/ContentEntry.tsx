import React, { useContext, useState, useEffect, Fragment } from "react";
import type { ComponentType, FunctionComponent } from "react";
import dynamic from "next/dynamic";

import { Context } from "@context";
import { useIsFirstRender } from "@hooks";

export const Loading: FunctionComponent = props => {
	const { setMdIsLoading } = useContext(Context);

	useEffect(() => {
		return () => setMdIsLoading(false);
	}, []);

	return <Fragment>{props.children}</Fragment>;
};

export const ContentEntry: FunctionComponent = () => {
	const { slug, file_path, md_is_loading, setMdIsLoading } = useContext(
		Context
	);

	const is_first_render = useIsFirstRender();

	const [Entry, setEntry] = useState<ComponentType>(
		dynamic(() => import(`${process.env.pages_dir}/${file_path}`))
	);

	const [EntryPrev, setEntryPrev] = useState<ComponentType>(Entry);

	useEffect(() => {
		if (is_first_render) return;

		setMdIsLoading(true);

		setEntry(
			dynamic(() => import(`${process.env.pages_dir}/${file_path}`), {
				// @ts-expect-error TODO
				loading: Loading,
			})
		);
	}, [slug]);

	useEffect(() => {
		if (md_is_loading) return;

		setEntryPrev(Entry);
	}, [md_is_loading]);

	return (
		<Fragment>
			{md_is_loading && <Entry />}

			<EntryPrev />
		</Fragment>
	);
};