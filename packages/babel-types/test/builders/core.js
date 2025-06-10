import * as t from "../../lib/index.js";
import { itBabel8 } from "$repo-utils";
import cp from "node:child_process";

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

  it("uppercase builders", () => {
    expect(t.ThisTypeAnnotation()).toEqual(t.thisTypeAnnotation());
  });

  itBabel8("uppercase builders are deprecated", async () => {
    // Spawn a separate process, because the warning only happens once for all builders
    // and it relies on global state due to the deduplication

    const { stderr } = cp.spawn(process.execPath, [
      "-p",
      `import(${JSON.stringify(new URL("../../lib/index.js", import.meta.url))}).then(t => t.ThisTypeAnnotation())`,
    ]);

    const logs = (await stderr.toArray()).join("");
    expect(logs).toMatch(
      /Usage of builders starting with an uppercase letter such as `ThisTypeAnnotation` has been deprecated/,
    );
  });
});
