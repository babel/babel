const path = require("path");
const { RuleTester } = require("eslint");

RuleTester.setDefaultConfig({
  parser: require.resolve("@babel/eslint-parser"),
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 11,
    babelOptions: {
      configFile: require.resolve(
        path.join(__dirname, "../config/babel.config.js")
      ),
    },
  },
});

module.exports = RuleTester;
