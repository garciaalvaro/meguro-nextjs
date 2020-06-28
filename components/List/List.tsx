import React, { FunctionComponent } from "react";
import Link from "next/link";

interface Props {
	entries: Entry[];
}

export const List: FunctionComponent<Props> = props => {
	const { entries, children } = props;

	return (
		<ul>
			{children}

			{entries.map(({ path, frontmatter }) => (
				<li key={path}>
					<Link href="/[slug]" as={path}>
						<a>
							<img src={frontmatter.thumb_img} />

							<h3>{frontmatter.title}</h3>
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
};
