import "@babel/polyfill/lib/core-js/modules/web.dom.iterable";
import "@babel/polyfill/lib/core-js/modules/es6.symbol";
import "@babel/polyfill/lib/core-js/modules/es6.regexp.match";
import "@babel/polyfill/lib/core-js/modules/es6.promise";
import "@babel/polyfill/lib/core-js/modules/es6.map";
import "@babel/polyfill/lib/core-js/modules/es6.array.from";
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
