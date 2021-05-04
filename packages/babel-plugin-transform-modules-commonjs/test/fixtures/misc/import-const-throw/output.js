"use strict";

var _foo = _interopRequireDefault(require("foo"));

var Bar = _interopRequireDefault(require("bar"));

var _baz = require("baz");

var _Baz;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
_foo.default = (_foo.default + 2, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}());
Bar = (Bar + 2, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}());
_baz.Baz = (_baz.Baz + 2, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}());
_foo.default = (_foo.default >>> 3, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}());
Bar = (Bar >>> 3, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}());
_baz.Baz = (_baz.Baz >>> 3, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}());
_foo.default && (_foo.default = (4, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}()));
Bar && (Bar = (4, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}()));
_baz.Baz && (_baz.Baz = (4, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}()));
_foo.default = (_foo.default - 1, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}());
Bar = (Bar - 1, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}());
_baz.Baz = (_baz.Baz - 1, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}());
_foo.default = (_foo.default + 1, function () {
  throw new Error('"' + "Foo" + '" is read-only.');
}());
Bar = (Bar + 1, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}());
_Baz = +_baz.Baz, _baz.Baz = (_Baz + 1, function () {
  throw new Error('"' + "Baz" + '" is read-only.');
}()), _Baz;
