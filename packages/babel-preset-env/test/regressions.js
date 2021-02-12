import * as babel7_12 from "@babel/core";
import env from "..";
import path from "path";
import { fileURLToPath } from "url";

describe("#12880", () => {
  it("read the .browserslistrc file when using @babel/core < 7.13.0", () => {
    // The browserslistrc file contains "firefox 50".
    // a ** b is supported starting from firefox 52;
    // a => b is supported starting from firefox 45.
    const out = babel7_12.transformSync("a ** b; a => b;", {
      configFile: false,
      presets: [[env, { modules: false }]],
      filename: path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "regressions",
        "input.js",
      ),
    });

    expect(out.code).toMatchInlineSnapshot(`
      "Math.pow(a, b);

      a => b;"
    `);
  });
});
