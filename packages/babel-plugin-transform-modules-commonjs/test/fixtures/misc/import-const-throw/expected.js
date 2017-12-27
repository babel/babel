"use strict";

var _foo = _interopRequireDefault(require("foo"));

var Bar = _interopRequireWildcard(require("bar"));

var _baz = require("baz");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
  Foo: _foo.default
} = {});
({
  Bar
} = ({}, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}()));
({
  Baz: _baz.Baz
} = {});
({
  prop: _foo.default
} = {});
({
  prop: Bar
} = ({}, function () {
  throw new Error('"' + "Bar" + '" is read-only.');
}()));
({
  prop: _baz.Baz
} = {});
