import { RuleTester } from "eslint";

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

export default RuleTester;
