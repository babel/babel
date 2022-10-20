const path = require("path");

module.exports = {
  entry: path.join(__dirname, "../src/main-esm.mjs"),
  output: {
    path: __dirname,
    filename: "output.js",
    hashFunction: "sha256",
  },

  devtool: false,
};
