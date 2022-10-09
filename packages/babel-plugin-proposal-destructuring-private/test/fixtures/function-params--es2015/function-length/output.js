class C {
  static 0(..._p) {
    var [..._p2] = _p,
      x = babelHelpers.classStaticPrivateFieldSpecGet(_p2[0], C, _x);
  }
  static 1(a, b = 1, _p3, ..._p4) {
    var x = babelHelpers.classStaticPrivateFieldSpecGet(_p3, C, _x),
      c = _p4;
  }
  static 2(a, b, _p5 = void 0) {
    var x = babelHelpers.classStaticPrivateFieldSpecGet(_p5 === void 0 ? C : _p5, C, _x);
  }
  static 3(a, b, _p6, _p7 = void 0) {
    var x = babelHelpers.classStaticPrivateFieldSpecGet(_p6, C, _x),
      c = _p7 === void 0 ? 1 : _p7;
  }
}
var _x = {
  writable: true,
  value: void 0
};
