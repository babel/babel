var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
class A {
  constructor() {
    Object.defineProperty(this, _x, {
      writable: true,
      value: void 0
    });
  }
  method() {
    var _obj, _obj2, _obj3, _obj4, _obj5, _obj6;
    (_obj = obj) === null || _obj === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(_obj, _x)[_x] = 1;
    (_obj2 = obj) === null || _obj2 === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(_obj2, _x)[_x] += 2;
    (_obj3 = obj) === null || _obj3 === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(_obj3, _x)[_x] ??= 3;
    (_obj4 = obj) === null || _obj4 === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(_obj4, _x)[_x].y = 4;
    (_obj5 = obj) === null || _obj5 === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(_obj5, _x)[_x].y += 5;
    (_obj6 = obj) === null || _obj6 === void 0 ? void 0 : babelHelpers.classPrivateFieldLooseBase(_obj6, _x)[_x].y ??= 6;
  }
}
