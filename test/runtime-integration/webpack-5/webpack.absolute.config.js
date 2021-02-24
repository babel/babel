const path = require("path");

module.exports = {
  mode: "development",

  entry: path.join(__dirname, "../src/absolute/main-esm.mjs"),
  output: {
    path: __dirname,
    filename: "output-absolute.js",
  },

  devtool: false,
};
