import "core-js/modules/esnext.map.delete-all.js";
import "core-js/modules/esnext.map.every.js";
import "core-js/modules/esnext.map.filter.js";
import "core-js/modules/esnext.map.find.js";
import "core-js/modules/esnext.map.find-key.js";
import "core-js/modules/esnext.map.includes.js";
import "core-js/modules/esnext.map.key-of.js";
import "core-js/modules/esnext.map.map-keys.js";
import "core-js/modules/esnext.map.map-values.js";
import "core-js/modules/esnext.map.merge.js";
import "core-js/modules/esnext.map.reduce.js";
import "core-js/modules/esnext.map.some.js";
import "core-js/modules/esnext.map.update.js";
import "core-js/modules/esnext.observable.js";
import "core-js/modules/esnext.symbol.observable.js";
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

const foo = new Promise(resolve => {
  resolve(new Map());
});
queueMicrotask(() => globalThis);
Observable.from(10);
