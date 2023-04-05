import * as babel7_12 from "@babel/core-7.12";
import env from "../lib/index.js";
import path from "path";
import { fileURLToPath } from "url";

const itBabel7 = process.env.BABEL_8_BREAKING ? it.skip : it;

describe("#12880", () => {
  afterEach(() => {
    jest.spyOn(process, "cwd").mockRestore();
  });

  it("empty", () => {
    // TODO(Babel 8): Delete this file
  });

  itBabel7(
    "read the .browserslistrc file when using @babel/core < 7.13.0",
    () => {
      const root = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "regressions",
      );

      // Unfortunatly, when loading the browserslist config through
      // @babel/preset-env, it's resolved from process.cwd() and not
      // from root. Mock it to isolate this test.
      const spy = jest.spyOn(process, "cwd").mockReturnValue(root);

      try {
        // The browserslistrc file contains "firefox 50".
        // a ** b is supported starting from firefox 52;
        // a => b is supported starting from firefox 45.
        const out = babel7_12.transformSync("a ** b; a => b;", {
          configFile: false,
          presets: [[env, { modules: false }]],
          filename: path.join(root, "input.js"),
          root,
        });

        expect(out.code).toMatchInlineSnapshot(`
        "Math.pow(a, b);
        a => b;"
      `);
      } finally {
        spy.mockRestore();
      }
    },
  );
});
