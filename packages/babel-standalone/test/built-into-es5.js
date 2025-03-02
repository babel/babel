import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fs from "fs";
import { parse as acornParse } from "acorn";
import { itGte } from "$repo-utils";

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

  const nodeGte20 = itGte("20.0.0");
  nodeGte20("should not contain extra require() calls", () => {
    // When the number of `require(` calls changes, make sure that none of
    // them is an actual CommonJS require call. The bundle must be self-contained.

    const requireCount =
      babelStandaloneSource.split(/(?<![."])require\(/g).length - 1;

    // 6 vs 13 depends on the build configuration
    expect([6, 13]).toContain(requireCount);
  });

  // https://github.com/babel/babel/issues/14301
  it("should not contain require.resolve()", () => {
    expect(babelStandaloneSource.includes("return require.resolve(")).toBe(
      false,
    );
  });
});
