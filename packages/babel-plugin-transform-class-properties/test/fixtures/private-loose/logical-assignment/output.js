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
    var _babelHelpers$classPr, _babelHelpers$classPr2, _babelHelpers$classPr3, _babelHelpers$classPr4;
    (_babelHelpers$classPr = babelHelpers.classPrivateFieldGetLoose(this, _nullish, 1))[_nullish] ?? (_babelHelpers$classPr[_nullish] = 42);
    (_babelHelpers$classPr2 = babelHelpers.classPrivateFieldGetLoose(this, _and, 1))[_and] && (_babelHelpers$classPr2[_and] = 0);
    (_babelHelpers$classPr3 = babelHelpers.classPrivateFieldGetLoose(this, _or, 1))[_or] || (_babelHelpers$classPr3[_or] = 0);
    (_babelHelpers$classPr4 = babelHelpers.classPrivateFieldGetLoose(this.self(), _nullish, 1))[_nullish] ?? (_babelHelpers$classPr4[_nullish] = 42);
  }
}
