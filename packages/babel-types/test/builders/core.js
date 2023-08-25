import * as t from "../../lib/index.js";
import { itBabel8 } from "$repo-utils";

describe("builders", function () {
  itBabel8("t.numericLiteral expexts a non-negative finite value", () => {
    expect(() => t.numericLiteral(-1)).toThrow();
    expect(() => t.numericLiteral(-0)).toThrow();
    expect(() => t.numericLiteral(-Infinity)).toThrow();
    expect(() => t.numericLiteral(Infinity)).toThrow();
    expect(() => t.numericLiteral(NaN)).toThrow();
  });
});
