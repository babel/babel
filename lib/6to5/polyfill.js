/* jshint newcap: false */

require("core-js/shim");
require("./transformation/transformers/es6-generators/runtime");

var ensureSymbol = function (key) {
  Symbol[key] = Symbol[key] || Symbol();
};

ensureSymbol("species");
ensureSymbol("hasInstance");
ensureSymbol("isConcatSpreadable");
ensureSymbol("isRegExp");
ensureSymbol("toPrimitive");
ensureSymbol("toStringTag");
ensureSymbol("unscopables");
