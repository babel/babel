import { parse } from "@babel/parser";
import { transformFromAstSync } from "@babel/core";
import _traverse from "@babel/traverse";
const traverse = _traverse.default;

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import glob from "glob";
import { promises as fs } from "fs";

const files = await new Promise((resolve, reject) => {
  glob(
    path.resolve(__dirname, "fixtures/**/@(exec|input).js"),
    function (err, files) {
      if (err) reject(err);
      else resolve(files);
    },
  );
});

describe("regression-14438", function () {
  it.each(files)("has correct scope information for fixture %s", async file => {
    const src = await fs.readFile(file, "utf-8");

    const originalAst = parse(src, {
      allowImportExportEverywhere: true,
      allowAwaitOutsideFunction: true,
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      allowUndeclaredExports: true,
      errorRecovery: true,
      attachComment: false,
      createParenthesizedExpressions: true,
    });

    const res = transformFromAstSync(originalAst, src, {
      plugins: [
        [
          "@babel/plugin-transform-destructuring",
          { useBuiltIns: true, loose: true },
        ],
      ],
      configFile: false,
      ast: true,
      code: true,
    });

    expect(res.ast).toBeTruthy();

    traverse(res.ast, {
      Identifier(path) {
        const b = path.scope.getBinding(path.node.name);
        expect(b).toBeTruthy();
      },
    });
  });
});
