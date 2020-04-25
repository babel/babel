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
    return [babelHelpers.classStaticPrivateMethodGet(this, B, _getA), babelHelpers.classStaticPrivateMethodGet(this, B, _getB)];
  }

}

var _getB = function _getB() {
  return this.b;
};

var _getA = function _getA() {
  var _thisSuper;

  return babelHelpers.get((_thisSuper = this, babelHelpers.getPrototypeOf(B)), "a", _thisSuper);
};

var [getA, getB] = B.extract();
