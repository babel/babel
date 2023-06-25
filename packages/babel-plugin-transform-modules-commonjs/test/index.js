import runner from "@babel/helper-plugin-test-runner";
import * as lexer from "cjs-module-lexer";
import * as babel from "@babel/core";
import transformCommonjs from "../lib/index.js";

runner(import.meta.url);

describe("compat", () => {
  async function transform(code, importInterop, filename) {
    return (
      await babel.transformAsync(code, {
        configFile: false,
        filename,
        ast: false,
        plugins: [
          [transformCommonjs, { importInterop }],
          ["@babel/transform-typescript"],
        ],
      })
    ).code;
  }

  it("should work with cjs-module-lexer", async () => {
    const code = await transform(`
      import { DEPRECATED_ALIASES } from "./deprecated-aliases";

      export {
        DEPRECATED_ALIASES,
      };

      exports.x = 1;

      export * from "all";
    `);

    await lexer.init();
    const exports = lexer.parse(code);
    expect(exports).toMatchInlineSnapshot(`
      Object {
        "exports": Array [
          "DEPRECATED_ALIASES",
          "__esModule",
          "x",
        ],
        "reexports": Array [
          "all",
        ],
      }
    `);
  });
});
