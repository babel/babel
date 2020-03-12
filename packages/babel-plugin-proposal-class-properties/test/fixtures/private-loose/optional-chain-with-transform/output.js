function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

class Foo {
  static test() {
    var _o, _ref, _o2, _ref2, _o3, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _o4, _ref10, _o5, _ref11, _o6, _ref12, _ref13, _ref14, _o7, _ref15, _ref16, _ref17, _o8, _ref18, _ref19, _ref20, _o9, _o10, _o11, _ref21, _ref22, _ref23, _o12, _o13, _ref24, _o14, _ref25, _o15, _ref26, _ref27, _o16;

    const o = {
      Foo: Foo
    };
    const deep = {
      very: {
        o
      }
    };
    (_ref = (_o9 = _o = o) === null || _o9 === void 0 ? void 0 : _o9.Foo, _o === void 0 || _o === null) ? void 0 : _classPrivateFieldLooseBase(_ref, _x)[_x];
    (_ref2 = (_o10 = _o2 = o) === null || _o10 === void 0 ? void 0 : _o10.Foo, _o2 === void 0 || _o2 === null) ? void 0 : _classPrivateFieldLooseBase(_ref2, _x)[_x].toString;
    (_ref3 = (_o11 = _o3 = o) === null || _o11 === void 0 ? void 0 : _o11.Foo, _o3 === void 0 || _o3 === null) ? void 0 : _classPrivateFieldLooseBase(_ref3, _x)[_x].toString();
    (_ref5 = (_ref21 = _ref4 = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _ref21 === void 0 ? void 0 : _ref21.Foo, _ref4 === void 0 || _ref4 === null) ? void 0 : _classPrivateFieldLooseBase(_ref5, _x)[_x];
    (_ref7 = (_ref22 = _ref6 = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _ref22 === void 0 ? void 0 : _ref22.Foo, _ref6 === void 0 || _ref6 === null) ? void 0 : _classPrivateFieldLooseBase(_ref7, _x)[_x].toString;
    (_ref9 = (_ref23 = _ref8 = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _ref23 === void 0 ? void 0 : _ref23.Foo, _ref8 === void 0 || _ref8 === null) ? void 0 : _classPrivateFieldLooseBase(_ref9, _x)[_x].toString();
    (_ref10 = (_o12 = _o4 = o) === null || _o12 === void 0 ? void 0 : _o12.Foo, _o4 === void 0 || _o4 === null) ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_ref10, _self)[_self], _x)[_x];
    (_ref11 = (_o13 = _o5 = o) === null || _o13 === void 0 ? void 0 : _o13.Foo, _o5 === void 0 || _o5 === null) ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_ref11, _self)[_self].self, _x)[_x];
    (_ref14 = (_ref24 = _ref13 = (_ref12 = (_o14 = _o6 = o) === null || _o14 === void 0 ? void 0 : _o14.Foo, _o6 === void 0 || _o6 === null) ? void 0 : _classPrivateFieldLooseBase(_ref12, _self)[_self]) === null || _ref24 === void 0 ? void 0 : _ref24.self, _ref13 === void 0 || _ref13 === null) ? void 0 : _classPrivateFieldLooseBase(_ref14, _x)[_x];
    (_ref17 = (_ref25 = _ref16 = (_ref15 = (_o15 = _o7 = o) === null || _o15 === void 0 ? void 0 : _o15.Foo, _o7 === void 0 || _o7 === null) ? void 0 : _classPrivateFieldLooseBase(_ref15, _self)[_self].self) === null || _ref25 === void 0 ? void 0 : _ref25.self, _ref16 === void 0 || _ref16 === null) ? void 0 : _classPrivateFieldLooseBase(_ref17, _x)[_x];
    (_ref20 = (_ref26 = _ref19 = (_ref27 = (_ref18 = (_o16 = _o8 = o) === null || _o16 === void 0 ? void 0 : _o16.Foo, _o8 === void 0 || _o8 === null) ? void 0 : _classPrivateFieldLooseBase(_ref18, _self)[_self]) === null || _ref27 === void 0 ? void 0 : _ref27.self) === null || _ref26 === void 0 ? void 0 : _ref26.self, _ref19 === void 0 || _ref19 === null) ? void 0 : _classPrivateFieldLooseBase(_ref20, _x)[_x];
  }

}

var _x = _classPrivateFieldLooseKey("x");

var _self = _classPrivateFieldLooseKey("self");

Object.defineProperty(Foo, _x, {
  writable: true,
  value: 1
});
Object.defineProperty(Foo, _self, {
  writable: true,
  value: Foo
});
Foo.self = Foo;
Foo.test();
