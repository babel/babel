var _nullish = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("nullish");
var _and = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("and");
var _or = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("or");
class Foo {
  constructor() {
    Object.defineProperty(this, _nullish, {
      writable: true,
      value: 0
    });
    Object.defineProperty(this, _and, {
      writable: true,
      value: 0
    });
    Object.defineProperty(this, _or, {
      writable: true,
      value: 0
    });
  }
  self() {
    return this;
  }
  test() {
    var _babelHelpers$assertC, _babelHelpers$assertC2, _babelHelpers$assertC3, _babelHelpers$assertC4;
    (_babelHelpers$assertC = babelHelpers.assertClassBrandLoose(this, _nullish))[_nullish] ?? (_babelHelpers$assertC[_nullish] = 42);
    (_babelHelpers$assertC2 = babelHelpers.assertClassBrandLoose(this, _and))[_and] && (_babelHelpers$assertC2[_and] = 0);
    (_babelHelpers$assertC3 = babelHelpers.assertClassBrandLoose(this, _or))[_or] || (_babelHelpers$assertC3[_or] = 0);
    (_babelHelpers$assertC4 = babelHelpers.assertClassBrandLoose(this.self(), _nullish))[_nullish] ?? (_babelHelpers$assertC4[_nullish] = 42);
  }
}
