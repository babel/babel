const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parser: require.resolve("@babel/eslint-parser"),
});

module.exports = RuleTester;
