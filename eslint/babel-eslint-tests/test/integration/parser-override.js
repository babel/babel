import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import * as babelESLint from "@babel/eslint-parser";
import { itGte } from "$repo-utils";

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

  const nodeGte12 = itGte("12.0.0");
  nodeGte12("works when parsing in a worker", async () => {
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
