import "babel-polyfill/lib/core-js/modules/es6.regexp.split";
import "babel-polyfill/lib/core-js/modules/es6.regexp.replace";
import "babel-polyfill/lib/core-js/modules/es6.regexp.search";
import "babel-polyfill/lib/core-js/modules/es6.array.copy-within";
import "babel-polyfill/lib/core-js/modules/es6.string.ends-with";
import "babel-polyfill/lib/core-js/modules/es6.string.code-point-at";
import "babel-polyfill/lib/core-js/modules/es6.string.starts-with";
import "babel-polyfill/lib/core-js/modules/es7.string.pad-end";
import "babel-polyfill/lib/core-js/modules/es7.string.pad-start";
import "babel-polyfill/lib/core-js/modules/es6.array.fill";
import "babel-polyfill/lib/core-js/modules/es6.array.find-index";
import "babel-polyfill/lib/core-js/modules/es6.array.find";
import "babel-polyfill/lib/core-js/modules/es7.array.includes";
import "babel-polyfill/lib/core-js/modules/es6.string.includes";
import "babel-polyfill/lib/core-js/modules/es6.map";
import "babel-polyfill/lib/core-js/modules/es6.array.from";
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