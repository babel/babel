var _x = /*#__PURE__*/new WeakMap();
class A {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _x, void 0);
  }
  method() {
    var _obj, _obj2, _obj3, _obj4, _obj5, _obj6;
    (_obj = obj) == null ? void 0 : babelHelpers.classPrivateFieldSet2(_x, _obj, 1);
    (_obj2 = obj) == null ? void 0 : babelHelpers.classPrivateFieldSet2(_x, _obj2, babelHelpers.classPrivateFieldGet2(_x, _obj2) + 2);
    (_obj3 = obj) == null ? void 0 : babelHelpers.classPrivateFieldGet2(_x, _obj3) ?? babelHelpers.classPrivateFieldSet2(_x, _obj3, 3);
    (_obj4 = obj) == null ? void 0 : babelHelpers.classPrivateFieldGet2(_x, _obj4).y = 4;
    (_obj5 = obj) == null ? void 0 : babelHelpers.classPrivateFieldGet2(_x, _obj5).y += 5;
    (_obj6 = obj) == null ? void 0 : babelHelpers.classPrivateFieldGet2(_x, _obj6).y ??= 6;
  }
}
