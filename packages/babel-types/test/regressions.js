import * as t from "../lib";

describe("regressions", () => {
  const babel7 = process.env.BABEL_TYPES_8_BREAKING ? it.skip : it;

  babel7("jest .toMatchInlineSnapshot used 'Line' for comments", () => {
    expect(() => {
      t.file(t.program([]), [{ type: "Line" }]);
    }).not.toThrow();
  });
});
