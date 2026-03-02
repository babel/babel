import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import * as babelESLint from "@babel/eslint-parser";

describe("parserOverride", () => {
  const expectedAST = {
    type: "Program",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "Identifier",
          name: "foo",
        },
      },
    ],
  };

  it("works when parsing in the main thread", () => {
    const { ast } = babelESLint.parseForESLint(`27`, {
      filename: "input.js",
      babelOptions: {
        configFile: path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          "../fixtures/parser-override/babel.config.json",
        ),
      },
    });

    expect(ast).toMatchObject(expectedAST);
  });

  const babel7node12 = parseInt(process.versions.node) < 12 ? it.skip : it;
  babel7node12("works when parsing in a worker", async () => {
    const require = createRequire(import.meta.url);
    // eslint-disable-next-line import/extensions
    const babelESLintWorker = require("@babel/eslint-parser/experimental-worker");

    const { ast } = babelESLintWorker.parseForESLint(`27`, {
      filename: "input.js",
      babelOptions: {
        configFile: path.resolve(
          path.dirname(fileURLToPath(import.meta.url)),
          "../fixtures/parser-override/babel.config.json",
        ),
      },
    });

    expect(ast).toMatchObject(expectedAST);
  });
});
