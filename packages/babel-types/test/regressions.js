import * as t from "../lib";

describe("regressions", () => {
  it("jest .toMatchInlineSnapshot usef 'Line' for comments", () => {
    expect(() => {
      t.file(t.program([]), [{ type: "Line" }]);
    }).not.toThrow();
  });
});
