"use strict";

var _foo = _interopRequireDefault(require("foo"));
var Bar = _interopRequireWildcard(require("bar"));
var _baz = require("baz");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
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
