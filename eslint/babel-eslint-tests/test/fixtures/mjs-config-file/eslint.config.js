module.exports = {
  languageOptions: {
    parser: require("@babel/eslint-parser"),
    parserOptions: {
      babelOptions: {
        configFile: __dirname + "/babel.config.mjs",
        sourceType: "module",
      },
    },
  },
  rules: {
    "template-curly-spacing": "error",
  },
};
