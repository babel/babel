import "core-js/modules/es6.symbol.js";
import "core-js/modules/es6.array.from.js";
import "core-js/modules/es6.string.iterator.js";
import "core-js/modules/es6.object.to-string.js";
import "core-js/modules/es6.array.iterator.js";
import "core-js/modules/web.dom.iterable.js";
import "core-js/modules/es6.map.js";
import "core-js/modules/es6.promise.js";
import "core-js/modules/es6.regexp.match.js";
Array.from; // static method
Map; // built-in
new Promise(); // new builtin
Symbol.match; // as member expression
_arr[Symbol.iterator](); // Symbol.iterator

// no import
Array.asdf;
Array2.from;
Map2;
new Promise2();
Symbol.asdf;
Symbol2.match;
_arr9[Symbol2.iterator]();
_arr9[Symbol.iterator2]();
G.assign; // static method
function H(WeakMap) {
  var blah = new WeakMap();
} // shadowed
