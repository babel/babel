if (global._babelPolyfill) {
  // silently fail at runtime instead of throwing an error.
  // enables multiple scripts that may be outside of a developer's control to include babel-polyfill.
  // https://github.com/babel/babel/issues/5556
  return;
}
global._babelPolyfill = true;

import "core-js/shim";
import "regenerator-runtime/runtime";

// Should be removed in the next major release:

import "core-js/fn/regexp/escape";

const DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable:     true,
    configurable: true,
    value:        value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

// eslint-disable-next-line max-len
"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function(key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
