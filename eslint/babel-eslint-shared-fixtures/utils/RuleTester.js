const { RuleTester } = require("eslint");

const defaultConfig = {
  languageOptions: {
    parser: require("@babel/eslint-parser"),
    parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      babelOptions: {
        configFile: require.resolve("../config/babel.config.js"),
      },
    },
  },
};

RuleTester.setDefaultConfig(defaultConfig);

module.exports = RuleTester;
