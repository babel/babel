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

    it("transforms the ast", function () {
      expect(transformed.ast).toBeTruthy();
    });

    it("has correct scope information for fixture before transform", function () {
      traverse(originalAst, {
        Identifier(path) {
          const b = path.scope.getBinding(path.node.name);
          expect(b).toBeTruthy();
        },
      });
    });

    it("has correct scope information for fixture after transform", function () {
      traverse(transformed.ast, {
        Identifier(path) {
          const b = path.scope.getBinding(path.node.name);
          expect(b).toBeTruthy();
        },
      });
    });
  });
});
