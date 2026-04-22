import { RuleTester } from "eslint";
import babelESLintParser from "@babel/eslint-parser";
import { fileURLToPath } from "node:url";

const defaultConfig = {
  languageOptions: {
    parser: babelESLintParser,
    parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      babelOptions: {
        configFile: fileURLToPath(
          new URL("../config/babel.config.js", import.meta.url)
        ),
      },
    },
  },
};

RuleTester.setDefaultConfig(defaultConfig);

export default RuleTester;
