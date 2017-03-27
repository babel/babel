"use strict";

const register = require("babel-register").default;
const config = require("../.babelrc");

register(Object.assign({}, config, {
  extensions: [".js"],
  // Only js files in the test folder but not in the subfolder fixtures.
  only: [/packages\/.+\/test\/(?!fixtures\/).+\.js$/],
  compact: true,
}));
