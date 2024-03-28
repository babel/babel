var _two = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("two");
var _private = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("private");
var _four = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("four");
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  this.one = babelHelpers.assertClassBrandLoose(this, _private, 1);
  Object.defineProperty(this, _two, {
    writable: true,
    value: babelHelpers.assertClassBrandLoose(this, _private, 1)
  });
  Object.defineProperty(this, _private, {
    writable: true,
    value: 0
  });
  this.three = babelHelpers.assertClassBrandLoose(this, _private, 1);
  Object.defineProperty(this, _four, {
    writable: true,
    value: babelHelpers.assertClassBrandLoose(this, _private, 1)
  });
});
