import * as t from "../lib";

describe("regressions", () => {
  it("jest .toMatchInlineSnapshot used 'Line' for comments", () => {
    expect(() => {
      t.file(t.program([]), [{ type: "Line" }]);
    }).not.toThrow();
  });
});
