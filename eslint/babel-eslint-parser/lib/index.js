"use strict";

let patched = false;

exports.parse = function(code, options) {
  patched = true;
  return require("./parse-with-patch")(code, options);
};

exports.parseForESLint = function(code, options) {
  if (!patched && options.eslintVisitorKeys && options.eslintScopeManager) {
    return require("./parse-with-scope")(code, options);
  }

  patched = true;
  return { ast: require("./parse-with-patch")(code, options) };
};
