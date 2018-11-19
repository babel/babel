import "core-js/modules/es7.symbol.async-iterator";
import "core-js/modules/web.dom.iterable";
Array.from; // static method

Map; // built-in

new Promise(); // new builtin

Symbol.match; // as member expression

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

j[`copyWithin`]; // computed with template

var {
  [asdf]: _a
} = k; // computed
