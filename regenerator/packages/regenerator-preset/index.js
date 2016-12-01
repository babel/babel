module.exports = {
  plugins: [
    require("babel-plugin-syntax-async-functions"),
    require("babel-plugin-syntax-async-generators"),
    require("babel-plugin-transform-es2015-classes"),
    require("babel-plugin-transform-es2015-arrow-functions"),
    require("babel-plugin-transform-es2015-block-scoping"),
    require("babel-plugin-transform-es2015-for-of"),
    require("regenerator-transform").default
  ]
};
