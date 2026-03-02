import "core-js/modules/es.array.copy-within.js";
import "core-js/modules/es.array.fill.js";
import "core-js/modules/es.array.find.js";
import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.includes.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.function.bind.js";
import "core-js/modules/es.map.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.code-point-at.js";
import "core-js/modules/es.string.ends-with.js";
import "core-js/modules/es.string.includes.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/es.string.pad-end.js";
import "core-js/modules/es.string.pad-start.js";
import "core-js/modules/es.string.replace.js";
import "core-js/modules/es.string.search.js";
import "core-js/modules/es.string.split.js";
import "core-js/modules/es.string.starts-with.js";
import "core-js/modules/web.dom-collections.iterator.js";
Array.from; // static function
Map; // top level built-in

// instance methods may have false positives (which is ok)
a.includes(); // method call
b['find']; // computed string?
c.prototype.findIndex(); // .prototype
d.fill.bind(); //.bind
e.padStart.apply(); // .apply
f.padEnd.call(); // .call
String.prototype.startsWith.call; // prototype.call
var _k = k,
  codePointAt = _k.codePointAt,
  endsWith = _k.endsWith; // destructuring

var asdf = "copyWithin";
var asdf2 = "split";
var asdf3 = "re" + "place";
i[asdf]; // computed with identifier
j["search"]; // computed with template
k[asdf3]; // computed with concat strings
var _k2 = k,
  _a = _k2[asdf2]; // computed
