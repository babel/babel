import eslint from "eslint";
import path from "path";
import { fileURLToPath } from "url";
import * as parser from "@babel/eslint-parser";

describe("ESLint config", () => {
  it('should set ecmaVersion to latest and sourceType to "module" by default', () => {
    const linter = new eslint.Linter();
    linter.defineParser("@babel/eslint-parser", parser);
    // ImportDeclarations result in a parser error if ecmaVersion < 2015 and sourceType != "module".
    const messages = linter.verify('import { hello } from "greetings"', {
      parser: "@babel/eslint-parser",
      parserOptions: {
        babelOptions: {
          configFile: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            "../../../../babel-eslint-shared-fixtures/config/babel.config.js",
          ),
        },
      },
    });
    expect(messages.length).toEqual(0);
  });

  it('should allow ecmaVersion to be "latest"', () => {
    const linter = new eslint.Linter();
    linter.defineParser("@babel/eslint-parser", parser);
    // ImportDeclarations result in a parser error if ecmaVersion < 2015 and sourceType != "module".
    const messages = linter.verify('import { hello } from "greetings"', {
      parser: "@babel/eslint-parser",
      parserOptions: {
        ecmaVersion: "latest",
        babelOptions: {
          configFile: path.resolve(
            path.dirname(fileURLToPath(import.meta.url)),
            "../../../../babel-eslint-shared-fixtures/config/babel.config.js",
          ),
        },
      },
    });
    expect(messages.length).toEqual(0);
  });
});
