"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.symbol.match");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.map");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.queue-microtask");

require("core-js/modules/esnext.global-this");

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


var foo = new Promise(function (resolve) {
  resolve(new Map());
});
queueMicrotask(function () {
  return globalThis;
});
Observable.from(10);
