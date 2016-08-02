module.exports = {
  presets: [
    require("babel-preset-stage-2")
  ],
  plugins: [
    require("babel-plugin-transform-class-constructor-call"),
    require("babel-plugin-transform-export-extensions")
  ]
};
