"use strict";

var _foo = _interopRequireDefault(require("foo"));
var Bar = _interopRequireWildcard(require("bar"));
var _baz = require("baz");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
