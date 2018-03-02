require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.array.copy-within");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/es6.string.code-point-at");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es7.string.pad-end");

require("core-js/modules/es7.string.pad-start");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.function.bind");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.array.find");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.map");

require("core-js/modules/es6.array.from");

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
