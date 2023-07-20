import * as t from "../../lib/index.js";

const itBabel8 = process.env.BABEL_8_BREAKING ? it : it.skip;

describe("builders", function () {
  itBabel8("t.numericLiteral expexts a non-negative finite value", () => {
    expect(() => t.numericLiteral(-1)).toThrow();
    expect(() => t.numericLiteral(-0)).toThrow();
    expect(() => t.numericLiteral(-Infinity)).toThrow();
    expect(() => t.numericLiteral(Infinity)).toThrow();
    expect(() => t.numericLiteral(NaN)).toThrow();
  });
});
