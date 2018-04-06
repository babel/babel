import "core-js/modules/es.string.split";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.search";
import "core-js/modules/es.array.copy-within";
import "core-js/modules/es.string.ends-with";
import "core-js/modules/es.string.code-point-at";
import "core-js/modules/es.string.starts-with";
import "core-js/modules/es.string.pad-end";
import "core-js/modules/es.string.pad-start";
import "core-js/modules/es.array.fill";
import "core-js/modules/es.function.bind";
import "core-js/modules/es.array.find-index";
import "core-js/modules/es.array.find";
import "core-js/modules/es.array.includes";
import "core-js/modules/es.string.includes";
import "core-js/modules/web.dom-collections.iterator";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.map";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.array.from";
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
