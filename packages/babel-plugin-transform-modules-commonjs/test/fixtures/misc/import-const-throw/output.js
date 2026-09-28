"use strict";

var _foo = _interopRequireDefault(require("foo"));
var Bar = _interopRequireWildcard(require("bar"));
var _baz = require("baz");
function _interopRequireWildcard(e, r) { if ("function" == typeof WeakMap) var t = new WeakMap(); return (_interopRequireWildcard = function (e, r) { if (!r && e && e.__esModule) return e; var n, i, o = Object.defineProperty, u = { __proto__: null, default: e }; if (Object(e) !== e) return u; if (t) { if (t.has(e)) return t.get(e); t.set(e, u); } for (i in e) "default" !== i && {}.hasOwnProperty.call(e, i) && ((n = o && Object.getOwnPropertyDescriptor(e, i)) && (n.get || n.set) ? o(u, i, n) : u[i] = e[i]); return u; })(e, r); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_foo.default = (42, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}());
Bar = (43, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}());
_baz.Baz = (44, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}());
({
  Foo
} = ({}, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}()));
({
  Bar
} = ({}, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}()));
({
  Baz
} = ({}, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}()));
({
  prop: Foo
} = ({}, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}()));
({
  prop: Bar
} = ({}, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}()));
({
  prop: Baz
} = ({}, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}()));
_foo.default = _foo.default + (2, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}());
Bar = Bar + (2, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}());
_baz.Baz = _baz.Baz + (2, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}());
_foo.default = _foo.default >>> (3, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}());
Bar = Bar >>> (3, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}());
_baz.Baz = _baz.Baz >>> (3, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}());
_foo.default = _foo.default && (4, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}());
Bar = Bar && (4, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}());
_baz.Baz = _baz.Baz && (4, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}());
_foo.default -= function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}();
Bar -= function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}();
_baz.Baz -= function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}();
_foo.default += function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}();
Bar += function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}();
_baz.Baz += function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}();
for (let _Foo in {}) {
  (function () {
    throw new Error('"' + "Foo" + '" is read-only.');
  })();
  ;
}
for (let _Bar in {}) {
  (function () {
    throw new Error('"' + "Bar" + '" is read-only.');
  })();
}
for (let _Baz of []) {
  (function () {
    throw new Error('"' + "Baz" + '" is read-only.');
  })();
  let Baz;
}
for (let _Foo2 in {}) {
  (function () {
    throw new Error('"' + "Foo" + '" is read-only.');
  })();
}
for (let _ref in {}) {
  (function () {
    throw new Error('"' + "Bar" + '" is read-only.');
  })();
}
for (let _ref2 in {}) {
  (function () {
    throw new Error('"' + "Baz" + '" is read-only.');
  })();
}
