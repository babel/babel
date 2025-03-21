import * as t from "../../lib/index.js";
import { itBabel8 } from "$repo-utils";

describe("builders", function () {
  itBabel8("t.numericLiteral expects a non-negative finite value", () => {
    expect(() => t.numericLiteral(-1)).toThrow();
    expect(() => t.numericLiteral(-0)).toThrow();
    expect(() => t.numericLiteral(-Infinity)).toThrow();
    expect(() => t.numericLiteral(Infinity)).toThrow();
    expect(() => t.numericLiteral(NaN)).toThrow();
  });
  it("t.bigIntLiteral expects a string value", () => {
    expect(t.bigIntLiteral("1")).toHaveProperty("value", "1");
  });

  itBabel8("uppercase builders are deprecated", () => {
    const spyConsoleWarn = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const node = t.ThisTypeAnnotation();

    expect(spyConsoleWarn).toHaveBeenCalledWith(
      expect.stringContaining("uppercase builders are deprecated"),
    );
    spyConsoleWarn.mockRestore();

    expect(node).toEqual(t.thisTypeAnnotation());
  });
});
