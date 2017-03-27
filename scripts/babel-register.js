"use strict";

const register = require("babel-register").default;

register({
  extensions: [".js"],
  // Only js files in the test folder but not in the subfolder fixtures.
  only: [/packages\/.+\/test\/(?!fixtures\/).+\.js$/],
  compact: true,
});
