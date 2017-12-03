"use strict";

const URL = require("whatwg-url-compat");

module.exports = function (core) {
  core.URL = URL.createURLConstructor();
};
