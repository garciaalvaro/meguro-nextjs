import React, {
	FunctionComponent,
	useContext,
	useState,
	useEffect,
} from "react";
import dynamic from "next/dynamic";

import { Context } from "@context";

export const ContentEntry: FunctionComponent = () => {
	const { slug, is_page } = useContext(Context);

	const [EntryPrevious, setEntryPrevious] = useState<React.ComponentType>(
		() => () => null
	);

	const [Entry, setEntry] = useState<React.ComponentType>(
		is_page
			? dynamic(() => import(`${process.env.pages_dir}/${slug}.md`))
			: dynamic(() => import(`${process.env.projects_dir}/${slug}.md`), {
					loading: EntryPrevious,
			  })
	);

	useEffect(() => {
		setEntry(
			is_page
				? dynamic(() => import(`${process.env.pages_dir}/${slug}.md`))
				: dynamic(
						() => import(`${process.env.projects_dir}/${slug}.md`),
						{
							loading: EntryPrevious,
						}
				  )
		);

		setEntryPrevious(Entry);
	}, [is_page, slug]);

	return <Entry />;
};
