import 'core-js/modules/es6.array.from';
import 'core-js/modules/es6.map';
import 'core-js/modules/es6.promise';
import 'core-js/modules/es6.regexp.match';
import 'core-js/modules/es6.symbol';
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

// not covered by this plugin
var asdf = 'copyWithin';
i[asdf]; // computed with identifier
j['copyWithin']; // computed with template
var _k = k,
    _a = _k[asdf]; // computed