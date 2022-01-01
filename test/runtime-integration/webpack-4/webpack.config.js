const path = require("path");

module.exports = {
  mode: "development",

  entry: path.join(__dirname, "../src/main-esm.mjs"),
  output: {
    path: __dirname,
    filename: "output.js",
  },

  devtool: false,
};
