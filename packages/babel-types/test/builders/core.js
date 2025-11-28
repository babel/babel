import * as t from "../../lib/index.js";

import cp from "node:child_process";

describe("builders", function () {
  it("t.numericLiteral expects a non-negative finite value", () => {
    expect(() => t.numericLiteral(-1)).toThrow();
    expect(() => t.numericLiteral(-0)).toThrow();
    expect(() => t.numericLiteral(-Infinity)).toThrow();
    expect(() => t.numericLiteral(Infinity)).toThrow();
    expect(() => t.numericLiteral(NaN)).toThrow();
  });

  it("t.bigIntLiteral expects a bigint value", () => {
    const bigIntLiteral = t.bigIntLiteral(BigInt(1));
    expect(bigIntLiteral).toHaveProperty("value", BigInt(1));
  });

  it("uppercase builders", () => {
    expect(t.ThisTypeAnnotation()).toEqual(t.thisTypeAnnotation());
  });

  it("uppercase builders are deprecated", async () => {
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
