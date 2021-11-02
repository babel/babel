import path from "path";
import { fileURLToPath } from "url";
import * as babelESLint from "@babel/eslint-parser";
import * as babelESLintWorker from "@babel/eslint-parser/experimental-worker";

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

  it("works when parsing in a worker", () => {
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
