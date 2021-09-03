import React, { useRef, useState } from "react";
import type { FunctionComponent } from "react";

import styles from "./slider.module.sass";

export const Slider: FunctionComponent = props => {
	const { children } = props;
	const [active_index, setActiveIndex] = useState(0);
	const children_count = useRef(React.Children.count(children)).current;

	return (
		<div className={styles.container}>
			{React.Children.map(children, (child, index) =>
				index === active_index ? child : null
			)}

			<div className={styles.slider}>
				{Array(children_count)
					.fill(null)
					.map((_, index) => (
						<button
							className={
								active_index === index
									? styles.is_active
									: undefined
							}
							onClick={() => setActiveIndex(index)}
							key={index}
							aria-label={`Image ${index}`}
						>
							<svg viewBox="0 0 100 100">
								<circle r="50" cx="50" cy="50" />
							</svg>
						</button>
					))}
			</div>
		</div>
	);
};
