const { RuleTester } = require("eslint");

RuleTester.setDefaultConfig({
  parser: require.resolve("@babel/eslint-parser"),
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 11,
    babelOptions: {
      configFile: require.resolve("../config/babel.config.js"),
    },
  },
});

module.exports = RuleTester;
