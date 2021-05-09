// Import expect from Jest to prevent conflict with Cypress types
import { expect } from "@jest/globals";

import { className } from "@utils";

test("className", () => {
	expect(className("aaa")).toEqual("aaa");

	expect(className("aaa", "bbb")).toEqual("aaa bbb");

	expect(className("aaa", null)).toEqual("aaa");

	expect(className(null, "aaa")).toEqual("aaa");

	expect(className(undefined, "aaa", "bbb")).toEqual("aaa bbb");

	expect(className(undefined, null, "aaa")).toEqual("aaa");

	expect(className("aaa", null, "bbb")).toEqual("aaa bbb");

	expect(className({ aaa: true })).toEqual("aaa");

	expect(className({ aaa: false, bbb: true })).toEqual("bbb");

	expect(className({ aaa: true, bbb: false })).toEqual("aaa");

	expect(className()).toEqual("");
});
