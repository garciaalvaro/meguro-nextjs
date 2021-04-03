import { useMemo, useContext } from "react";

import { Context } from "@context";

export const usePages = (pages_slug: Page["slug"][]): Page[] => {
	const { pages } = useContext(Context);

	const pages_sorted = useMemo(() => {
		const pages_filtered = pages.filter(({ slug }) =>
			pages_slug.includes(slug)
		);

		const pages_sorted = pages_filtered.sort(
			(a, b) => pages_slug.indexOf(a.slug) - pages_slug.indexOf(b.slug)
		);

		return pages_sorted;
	}, [pages, pages_slug]);

	return pages_sorted;
};
