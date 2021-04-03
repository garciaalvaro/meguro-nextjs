import React, {
	useMemo,
	useContext,
	useState,
	useLayoutEffect,
	useEffect,
	Fragment,
} from "react";
import type { ComponentType, FunctionComponent } from "react";
import dynamic from "next/dynamic";

import { Context } from "@context";
import { useIsFirstRender } from "@hooks";

export const Loading: FunctionComponent = props => {
	const { setMdIsLoading } = useContext(Context);

	useEffect(() => {
		return () => setMdIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <Fragment>{props.children}</Fragment>;
};

export const ContentEntry: FunctionComponent = () => {
	const { slug, file_path, md_is_loading, setMdIsLoading } = useContext(
		Context
	);

	const is_first_render = useIsFirstRender();

	const EntryNext = useMemo<ComponentType>(() => {
		return dynamic(() => import(`${process.env.pages_dir}/${file_path}`), {
			// @ts-expect-error TODO
			loading: Loading,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slug]);

	useLayoutEffect(() => {
		if (is_first_render) return;

		setMdIsLoading(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slug]);

	const [Entry, setEntry] = useState<ComponentType>(EntryNext);

	useLayoutEffect(() => {
		if (md_is_loading) return;

		setEntry(EntryNext);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [md_is_loading]);

	return (
		<Fragment>
			{md_is_loading && <EntryNext />}

			<Entry />
		</Fragment>
	);
};
