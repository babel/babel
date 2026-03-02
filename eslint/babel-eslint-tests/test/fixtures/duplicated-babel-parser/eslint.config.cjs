const babelParser = require("@babel/eslint-parser");

module.exports = [
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          configFile: __dirname + "/babel.config.js",
          sourceType: "module",
        },
      },
    },

    rules: {
      "template-curly-spacing": "error",
    },
  },
];
