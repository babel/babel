const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parser: require.resolve("@babel/eslint-parser"),
  parserOptions: {
    babelOptions: {
      configFile: require.resolve(
        "@babel/eslint-shared-fixtures/config/babel.config.js",
      ),
    },
  },
});

module.exports = RuleTester;
