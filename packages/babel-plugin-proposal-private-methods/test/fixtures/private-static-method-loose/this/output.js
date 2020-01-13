class A {
  static get a() {
    return 1;
  }

}

class B extends A {
  static get b() {
    return 2;
  }

  static extract() {
    return [babelHelpers.classPrivateFieldLooseBase(this, _getA)[_getA], babelHelpers.classPrivateFieldLooseBase(this, _getB)[_getB]];
  }

}

var _getA = babelHelpers.classPrivateFieldLooseKey("getA");

var _getB = babelHelpers.classPrivateFieldLooseKey("getB");

var _getB2 = function _getB2() {
  return this.b;
};

var _getA2 = function _getA2() {
  return A.a;
};

Object.defineProperty(B, _getA, {
  value: _getA2
});
Object.defineProperty(B, _getB, {
  value: _getB2
});
var [getA, getB] = B.extract();
