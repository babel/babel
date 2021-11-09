import { findSuggestion } from "../lib/index.js";

describe("findSuggestion", function () {
  test.each([
    ["cat", ["cow", "dog", "pig"], "cow"],
    ["uglifyjs", [], undefined],
  ])("findSuggestion(%p, %p) returns %p", (str, arr, expected) => {
    expect(findSuggestion(str, arr)).toBe(expected);
  });
});
