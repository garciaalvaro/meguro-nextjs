import { meguro_home } from "./meguro-home";
import { meguro_1 } from "./meguro-1";
import { meguro_2 } from "./meguro-2";
import { meguro_3 } from "./meguro-3";
import { meguro_4 } from "./meguro-4";

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
