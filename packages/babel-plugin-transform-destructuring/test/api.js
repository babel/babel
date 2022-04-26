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
  describe.each(files)("fixture: %s", file => {
    let src, originalAst, transformed;

    beforeEach(async () => {
      src = await fs.readFile(file, "utf-8");

      originalAst = parse(src, {
        allowImportExportEverywhere: true,
        allowAwaitOutsideFunction: true,
        allowReturnOutsideFunction: true,
        allowSuperOutsideMethod: true,
        allowUndeclaredExports: true,
        errorRecovery: true,
        attachComment: false,
        createParenthesizedExpressions: true,
      });

      transformed = transformFromAstSync(originalAst, src, {
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
    });

    it("has correct scope information after transform", function () {
      if (transformed.ast) {
        // exclude transformation failures: they're tested by the other cases
        traverse(transformed.ast, {
          VariableDeclarator(path) {
            const b = path.scope.getBinding(path.get("id").node.name);
            if (!b) {
              throw new Error(
                `No original binding for ${path.get("id").node.name}`,
              );
            }
          },
        });
      }
    });
  });
});
