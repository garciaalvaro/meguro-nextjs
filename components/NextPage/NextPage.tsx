import React, { useMemo, useContext } from "react";
import type { FunctionComponent } from "react";
import Link from "next/link";

import { usePages } from "@hooks";
import { Context } from "@context";
import styles from "./NextPage.styl";

const getNextPage = (pages: Page[], active_url_path: Page["url_path"]) => {
	const current_page_index = pages.findIndex(
		({ url_path }) => url_path === active_url_path
	);

	if (current_page_index === -1) {
		return;
	}

	const next_page = pages[current_page_index + 1];

	return next_page;
};

export const NextPage: FunctionComponent = () => {
	const pages_sorted = usePages(process.env.sidebar_menu_pages);

	const { active_url_path } = useContext(Context);

	const next_page = useMemo(() => {
		const next_page = getNextPage(pages_sorted, active_url_path);

		return next_page;
	}, [pages_sorted, active_url_path]);

	if (!next_page) {
		return null;
	}

	return (
		<Link href={next_page.url_path}>
			<a className={styles.link} data-testid="next_page">
				<span>next</span>
				<h5>{next_page.frontmatter.title}</h5>
			</a>
		</Link>
	);
};
