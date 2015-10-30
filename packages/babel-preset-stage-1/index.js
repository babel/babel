module.exports = {
  presets: [
    require("babel-preset-stage-2")
  ],
  plugins: [
    require("babel-plugin-transform-class-constructor-call"),
    require("babel-plugin-transform-class-properties"),
    require("babel-plugin-transform-decorators"),
    require("babel-plugin-transform-export-extensions")
  ]
};
