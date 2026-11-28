import { parseSync, transformFromAstSync } from "@babel/core";
import plugin from "../lib/index.js";

describe("transformFromAst", () => {
  it("transforms structs not in the source code", () => {
    const ast = parseSync("struct S { x = 1; }", {
      configFile: false,
      babelrc: false,
      parserOpts: { plugins: ["structs"] },
    });
    const { code } = transformFromAstSync(ast, "/* unrelated */", {
      configFile: false,
      babelrc: false,
      plugins: [plugin],
    });
    expect(code).not.toMatch(/\bstruct S\b/);
    expect(code).toMatch(/class S extends/);
  });
});
