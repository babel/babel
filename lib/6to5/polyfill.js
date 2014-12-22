/* jshint newcap: false, freeze: false */

var ensureSymbol = function (key) {
  Symbol[key] = Symbol[key] || Symbol(key);
};

var ensureProto = function (Constructor, key, val) {
  var proto = Constructor.prototype;
  if (!proto[key]) {
    Object.defineProperty(proto, key, {
      value: val
    });
  }
};

//

if (typeof Symbol === "undefined") {
  require("es6-symbol/implement");

  var globSymbols = {};

  Symbol.for = function (key) {
    return globSymbols[key] = globSymbols[key] || Symbol(key);
  };

  Symbol.keyFor = function (sym) {
    return sym.__description__;
  };
}

require("es6-shim");
require("regenerator/runtime");

ensureSymbol("species");

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
