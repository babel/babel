const { RuleTester } = require("eslint");
const {
  eslintConfigCompat,
} = require("../../babel-eslint-tests/test/helpers/eslintConfigCompat.cjs");

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

RuleTester.setDefaultConfig(eslintConfigCompat(defaultConfig));

module.exports = RuleTester;
