import { meguro_home } from "./meguro_home";
import { meguro_1 } from "./meguro_1";
import { meguro_2 } from "./meguro_2";
import { meguro_3 } from "./meguro_3";
import { meguro_4 } from "./meguro_4";

const custom_layouts = process.env.has_custom_layouts
	? require("@content/layouts/index.ts").layouts
	: {};

export const layouts = {
	meguro_home,
	meguro_1,
	meguro_2,
	meguro_3,
	meguro_4,
	...custom_layouts,
};
