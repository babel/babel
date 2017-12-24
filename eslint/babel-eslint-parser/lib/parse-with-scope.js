"use strict";

const t = require("@babel/types");
const analyzeScope = require("./analyze-scope");
const parse = require("./parse");

module.exports = function(code, options) {
  options = options || {};
  options.ecmaVersion = options.ecmaVersion || 6;
  options.sourceType = options.sourceType || "module";
  options.allowImportExportEverywhere =
    options.allowImportExportEverywhere || false;

  const ast = parse(code, options);
  const scopeManager = analyzeScope(ast, options);
  const visitorKeys = t.VISITOR_KEYS;

  return { ast, scopeManager, visitorKeys };
};
