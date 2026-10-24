class C {
  static 0(..._ref) {
    var [..._ref2] = _ref,
      x = babelHelpers.assertClassBrand(C, _ref2[0], _x)._;
  }
  static 1(a, b = 1, _ref3, ...c) {
    var x = babelHelpers.assertClassBrand(C, _ref3, _x)._;
  }
  static 2(a, b, _ref4 = C) {
    var x = babelHelpers.assertClassBrand(C, _ref4, _x)._;
  }
  static 3(a, b, _ref5, c = 1) {
    var x = babelHelpers.assertClassBrand(C, _ref5, _x)._;
  }
}
var _x = {
  _: void 0
};
