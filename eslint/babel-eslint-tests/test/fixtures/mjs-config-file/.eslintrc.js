module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  parserOptions: {
    babelOptions: {
      configFile: __dirname + "/babel.config.mjs",
      sourceType: "module",
    },
  },
  rules: {
    "template-curly-spacing": "error",
  },
};
