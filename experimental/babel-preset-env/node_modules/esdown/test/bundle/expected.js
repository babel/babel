var __M; (function(a) { var list = Array(a.length / 2); __M = function(i, es) { var m = list[i], f, e; if (typeof m === "function") { f = m; m = i ? { exports: {} } : module; f(list[i] = m, m.exports); e = m.exports; m.__es = Object(e) !== e || e.constructor === Object ? e : Object.create(e, { "default": { value: e } }); } return es ? m.__es : m.exports; }; for (var i = 0; i < a.length; i += 2) { var j = Math.abs(a[i]); list[j] = a[i + 1]; if (a[i] >= 0) __M(j); } })([
1, function(m) { m.exports = require("fs") },
-6, function(module, exports) {

module.exports = {
    "value": 1
}
;

},
2, function(module, exports) {

// pkg2/main.js
exports.data = __M(6, 0);


},
-7, function(module, exports) {

// b.js
module.exports = { b: "b" };


},
-3, function(module, exports) {

// a.js (legacy)
console.log("before b");
var b = __M(7, 0);
exports.a = "a";
console.log(b.b);


},
-4, function(module, exports) {

// pkg1/index.js


},
-5, function(module, exports) {

// deep.js
return;
// comment at end


},
0, function(module, exports) {

'use strict'; // root.js
var FS = __M(1, 1);
var pkg2 = __M(2, 1);

console.log(pkg2.data);

console.log("before a");
var a = __M(3, 0);
console.log(a.a);

require("fs");
__M(4, 0);
__M(5, 0);


}]);
