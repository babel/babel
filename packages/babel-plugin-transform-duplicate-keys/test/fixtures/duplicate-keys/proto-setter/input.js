var a = { __proto__() {}, __proto__: b };
var c = { __proto__, "__proto__": d };
var e = { get __proto__() {}, __proto__: f, set __proto__(v) {} };
var g = { __proto__: h, __proto__() {}, __proto__ };
