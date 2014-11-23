/* jshint newcap: false */

var ensureSymbol = function (key) {
  Symbol[key] = Symbol[key] || Symbol();
};

var ensureProto = function (Constructor, key, val) {
  var proto = Constructor.prototype;
  proto[key] = proto[key] || val;
};

//

if (typeof Symbol === "undefined") {
  require("es6-symbol/implement");
}

require("es6-shim");
require("./transformation/transformers/es6-generators/runtime");

// Abstract references

ensureSymbol("referenceGet");
ensureSymbol("referenceSet");
ensureSymbol("referenceDelete");

ensureProto(Function, Symbol.referenceGet, function () { return this; });

ensureProto(Map, Symbol.referenceGet, Map.prototype.get);
ensureProto(Map, Symbol.referenceSet, Map.prototype.set);
ensureProto(Map, Symbol.referenceDelete, Map.prototype.delete);

if (global.WeakMap) {
  ensureProto(WeakMap, Symbol.referenceGet, WeakMap.prototype.get);
  ensureProto(WeakMap, Symbol.referenceSet, WeakMap.prototype.set);
  ensureProto(WeakMap, Symbol.referenceDelete, WeakMap.prototype.delete);
}
