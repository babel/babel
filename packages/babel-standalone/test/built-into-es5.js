import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fs from "fs";
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
    // When the number of `require(` calls changes, make sure that none of
    // them is an actual CommonJS require call. The bundle must be self-contained.

    expect(babelStandaloneSource.split(/(?<![."])require\(/g).length - 1).toBe(
      13,
    );
  });
});
