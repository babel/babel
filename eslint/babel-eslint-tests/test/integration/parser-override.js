import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

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

  it("works when parsing in a worker", async () => {
    const require = createRequire(import.meta.url);
    const babelESLintWorker = require("@babel/eslint-parser");

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
