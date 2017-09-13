"use strict";

var _foo = require("foo");

var _foo2 = _interopRequireDefault(_foo);

var _bar = require("bar");

var Bar = _interopRequireWildcard(_bar);

var _baz = require("baz");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Foo = 42;
Bar = 43;
Baz = 44;
({
  Foo: _foo2.default
} = {});
({
  Bar
} = {});
({
  Baz: _baz.Baz
} = {});
({
  prop: _foo2.default
} = {});
({
  prop: Bar
} = {});
({
  prop: _baz.Baz
} = {});
