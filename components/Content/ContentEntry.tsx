import React, {
	FunctionComponent,
	useContext,
	useState,
	useEffect,
	Fragment,
} from "react";
import dynamic from "next/dynamic";

import { Context } from "@context";
import { useIsFirstRender } from "@utils";

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

	const [Entry, setEntry] = useState<React.ComponentType>(
		dynamic(() => import(`${process.env.pages_dir}/${file_path}`))
	);

	const [EntryPrev, setEntryPrev] = useState<React.ComponentType>(Entry);

	useEffect(() => {
		if (is_first_render) return;

		setMdIsLoading(true);

		setEntry(
			dynamic(() => import(`${process.env.pages_dir}/${file_path}`), {
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
