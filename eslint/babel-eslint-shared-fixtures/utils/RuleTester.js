import { RuleTester } from "eslint";
import babelESLintParser from "@babel/eslint-parser";

const defaultConfig = {
  languageOptions: {
    parser: babelESLintParser,
    parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      babelOptions: {
        configFile: new URL("../config/babel.config.js", import.meta.url)
          .pathname,
      },
    },
  },
};

RuleTester.setDefaultConfig(defaultConfig);

export default RuleTester;
