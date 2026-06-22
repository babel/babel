import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import fs from "node:fs";
import { parse as acornParse } from "acorn";

describe("@babel/standalone", () => {
  let babelStandaloneSource;

  beforeAll(() => {
    babelStandaloneSource = fs.readFileSync(require.resolve("../babel.js"), {
      encoding: "utf8",
    });
  });

  it("should be built into ES5", () => {
    expect(() => {
      acornParse(babelStandaloneSource, {
        ecmaVersion: 5,
        sourceType: "script",
      });
    }).not.toThrow();
  });

  it("should not contain extra require() calls", () => {
    const requireCount =
      babelStandaloneSource.split(/(?<![."])require\(/g).length - 1;

    expect(requireCount).toBe(4);
  });

  // https://github.com/babel/babel/issues/14301
  it("should not contain require.resolve()", () => {
    expect(babelStandaloneSource.includes("return require.resolve(")).toBe(
      false,
    );
  });
});
