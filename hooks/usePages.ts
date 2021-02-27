import { useState, useEffect, useContext } from "react";

import { Context } from "@context";

export const usePages = (pages_slug: Page["slug"][]): Page[] => {
	const [pages_sorted, setPagesSorted] = useState<Page[]>([]);
	const { pages } = useContext(Context);

	useEffect(() => {
		const pages_filtered = pages.filter(({ slug }) =>
			pages_slug.includes(slug)
		);

		const pages_sorted = pages_filtered.sort(
			(a, b) => pages_slug.indexOf(a.slug) - pages_slug.indexOf(b.slug)
		);

		setPagesSorted(pages_sorted);
	}, [pages_slug.join("")]);

	return pages_sorted;
};
