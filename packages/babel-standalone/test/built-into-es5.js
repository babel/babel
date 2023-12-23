import { createRequire } from "module";
const require = createRequire(import.meta.url);
import fs from "fs";
import { parse as acornParse } from "acorn";

describe("@babel/standalone", () => {
  it("should be built into ES5", () => {
    const babelStandaloneSource = fs.readFileSync(
      require.resolve("../babel.js"),
      "utf8",
    );

    expect(() => {
      acornParse(babelStandaloneSource, {
        ecmaVersion: 5,
        sourceType: "script",
      });
    }).not.toThrow();
  });
});
