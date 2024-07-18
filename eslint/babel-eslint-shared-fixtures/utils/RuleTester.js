const { RuleTester, ESLint } = require("eslint");

const languageOptions = {
  parser: require("@babel/eslint-parser"),
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    babelOptions: {
      configFile: require.resolve("../config/babel.config.js"),
    },
  },
};

RuleTester.setDefaultConfig(
  parseInt(ESLint.version) >= 9 ? { languageOptions } : languageOptions
);

module.exports = RuleTester;
