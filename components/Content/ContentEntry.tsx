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
	const {
		slug,
		file_path,
		is_page,
		md_is_loading,
		setMdIsLoading,
	} = useContext(Context);

	const is_first_render = useIsFirstRender();

	const [Entry, setEntry] = useState<React.ComponentType>(
		is_page
			? dynamic(() => import(`${process.env.pages_dir}/${file_path}`))
			: dynamic(() => import(`${process.env.projects_dir}/${file_path}`))
	);

	const [EntryPrev, setEntryPrev] = useState<React.ComponentType>(Entry);

	useEffect(() => {
		if (is_first_render) return;

		setMdIsLoading(true);

		if (is_page) {
			setEntry(
				dynamic(() => import(`${process.env.pages_dir}/${file_path}`), {
					loading: Loading,
				})
			);
		} else {
			setEntry(
				dynamic(
					() => import(`${process.env.projects_dir}/${file_path}`),
					{ loading: Loading }
				)
			);
		}
	}, [is_page, slug]);

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
