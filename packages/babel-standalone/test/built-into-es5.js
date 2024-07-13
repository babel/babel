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

    expect(babelStandaloneSource.split(/(?<![."])require\(/g).length - 1).toBe(
      process.env.BABEL_8_BREAKING ? 6 : 13,
    );
  });
});
