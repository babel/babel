"use strict";

var _foo = _interopRequireDefault(require("foo"));
var Bar = _interopRequireWildcard(require("bar"));
var _baz = require("baz");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
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
