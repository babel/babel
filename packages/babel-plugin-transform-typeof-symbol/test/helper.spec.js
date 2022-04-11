import * as babel from "@babel/core";
import fs from "fs";
import { createRequire } from "module";

import transformTypeofSymbol from "../lib/index.js";

const require = createRequire(import.meta.url);

const readFile = path =>
  new Promise((resolve, reject) =>
    fs.readFile(path, "utf8", (err, contents) => {
      if (err) reject(err);
      else resolve(contents);
    }),
  );

describe("@babel/plugin-transform-typeof-symbol", () => {
  test.each`
    runtime                     | type
    ${"@babel/runtime"}         | ${"esm"}
    ${"@babel/runtime"}         | ${"cjs"}
    ${"@babel/runtime-corejs2"} | ${"esm"}
    ${"@babel/runtime-corejs2"} | ${"cjs"}
    ${"@babel/runtime-corejs3"} | ${"esm"}
    ${"@babel/runtime-corejs3"} | ${"cjs"}
  `(
    "shouldn't transpile the $type $runtime helper",
    async ({ type, runtime }) => {
      let path = require.resolve(`${runtime}/helpers/typeof`);
      if (runtime === "esm") path = path.replace(".js", ".mjs");
      const src = await readFile(path);

      const ast = babel.parseSync(src, {
        configFile: false,
        sourceType: type === "esm" ? "module" : "script",
      });

      const withPlugin = babel.transformFromAstSync(ast, src, {
        configFile: false,
        plugins: [transformTypeofSymbol],
      });
      const withoutPlugin = babel.transformFromAstSync(ast, src, {
        configFile: false,
      });

      expect(withPlugin.code).toBe(withoutPlugin.code);
    },
  );
});
