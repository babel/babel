module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      configFile: false,
      cwd: __dirname,
      presets: ["@babel/preset-flow"]
    }
  },
  plugins: ["import"],
  rules: {
    "import/no-named-as-default": "error",
    "no-unused-vars": "error"
  }
}