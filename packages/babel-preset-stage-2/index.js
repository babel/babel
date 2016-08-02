module.exports = {
  presets: [
    require("babel-preset-stage-3")
  ],
  plugins: [
    require("babel-plugin-transform-class-properties"),
    require("babel-plugin-transform-object-rest-spread"),
    require("babel-plugin-transform-decorators")
  ]
};
