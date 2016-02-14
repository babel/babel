if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

import "core-js/shim";
import "babel-regenerator-runtime";

// Should be removed in the next major release:

import "core-js/fn/regexp/escape";

function define(O, key, value){
  O[key] || Object.defineProperty(O, key, {
    writable:     true,
    configurable: true,
    value:        value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function(key){
  [][key] && define(Array, key, Function.call.bind([][key]));
});