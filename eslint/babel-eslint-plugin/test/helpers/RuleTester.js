const path = require("path");
const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parser: require.resolve("@babel/eslint-parser"),
  parserOptions: {
    babelOptions: {
      configFile: path.resolve(
        __dirname,
        "../../../babel-eslint-shared-fixtures/config/babel.config.js",
      ),
    },
  },
});

module.exports = RuleTester;
