module.exports = {
  languageOptions: {
    parser: require("@babel/eslint-parser/experimental-worker"),
    parserOptions: {
      babelOptions: {
        configFile: __dirname + "/babel.config.json",
        sourceType: "module",
      },
    },
  },
  rules: {
    "template-curly-spacing": "error",
  },
};
