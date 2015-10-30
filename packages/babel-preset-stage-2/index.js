module.exports = {
  presets: [
    require("babel-preset-stage-3")
  ],
  plugins: [
    require("babel-plugin-syntax-trailing-function-commas"),
    require("babel-plugin-transform-object-rest-spread")
  ]
};
