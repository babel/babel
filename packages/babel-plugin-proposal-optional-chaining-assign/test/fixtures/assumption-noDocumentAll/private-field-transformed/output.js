var _x = /*#__PURE__*/new WeakMap();
class A {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _x, void 0);
  }
  method() {
    var _obj, _obj2, _obj3, _obj4, _obj5, _obj6;
    (_obj = obj) == null ? void 0 : babelHelpers.classPrivateFieldSet2(_obj, _x, 1);
    (_obj2 = obj) == null ? void 0 : babelHelpers.classPrivateFieldSet2(_obj2, _x, babelHelpers.classPrivateFieldGet2(_obj2, _x) + 2);
    (_obj3 = obj) == null ? void 0 : babelHelpers.classPrivateFieldGet2(_obj3, _x) ?? babelHelpers.classPrivateFieldSet2(_obj3, _x, 3);
    (_obj4 = obj) == null ? void 0 : babelHelpers.classPrivateFieldGet2(_obj4, _x).y = 4;
    (_obj5 = obj) == null ? void 0 : babelHelpers.classPrivateFieldGet2(_obj5, _x).y += 5;
    (_obj6 = obj) == null ? void 0 : babelHelpers.classPrivateFieldGet2(_obj6, _x).y ??= 6;
  }
}
