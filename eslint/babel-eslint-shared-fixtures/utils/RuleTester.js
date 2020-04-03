const path = require("path");
const { RuleTester } = require("eslint");

RuleTester.setDefaultConfig({
  parser: require.resolve("@babel/eslint-parser"),
  parserOptions: {
    babelOptions: {
      configFile: require.resolve(
        path.join(__dirname, "../config/babel.config.js")
      ),
    },
  },
});

module.exports = RuleTester;
