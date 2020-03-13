function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

class Foo {
  static test() {
    var _o, _ref, _o2, _ref2, _o3, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _o4, _ref10, _o5, _ref11, _o6, _ref12, _ref13, _ref14, _o7, _ref15, _ref16, _ref17, _o8, _ref18, _ref19, _ref20, _fn, _ref21, _fn2, _ref22, _fn3, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _fn4, _ref30, _fn5, _ref31, _fn6, _ref32, _ref33, _ref34, _fn7, _ref35, _ref36, _ref37, _fn8, _ref38, _ref39, _ref40, _o9, _o10, _o11, _ref41, _ref42, _ref43, _o12, _o13, _ref44, _o14, _ref45, _o15, _ref46, _ref47, _o16, _fn9, _fn10, _fn11, _ref48, _ref49, _ref50, _fn12, _fn13, _ref51, _fn14, _ref52, _fn15, _ref53, _ref54, _fn16;

    const o = {
      Foo: Foo
    };
    const deep = {
      very: {
        o
      }
    };

    function fn() {
      return o;
    }

    function fnDeep() {
      return deep;
    }

    (_ref = (_o9 = _o = o) === null || _o9 === void 0 ? void 0 : _o9.Foo, _o === void 0 || _o === null) ? void 0 : _classPrivateFieldLooseBase(_ref, _x)[_x];
    (_ref2 = (_o10 = _o2 = o) === null || _o10 === void 0 ? void 0 : _o10.Foo, _o2 === void 0 || _o2 === null) ? void 0 : _classPrivateFieldLooseBase(_ref2, _x)[_x].toString;
    (_ref3 = (_o11 = _o3 = o) === null || _o11 === void 0 ? void 0 : _o11.Foo, _o3 === void 0 || _o3 === null) ? void 0 : _classPrivateFieldLooseBase(_ref3, _x)[_x].toString();
    (_ref5 = (_ref41 = _ref4 = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _ref41 === void 0 ? void 0 : _ref41.Foo, _ref4 === void 0 || _ref4 === null) ? void 0 : _classPrivateFieldLooseBase(_ref5, _x)[_x];
    (_ref7 = (_ref42 = _ref6 = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _ref42 === void 0 ? void 0 : _ref42.Foo, _ref6 === void 0 || _ref6 === null) ? void 0 : _classPrivateFieldLooseBase(_ref7, _x)[_x].toString;
    (_ref9 = (_ref43 = _ref8 = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _ref43 === void 0 ? void 0 : _ref43.Foo, _ref8 === void 0 || _ref8 === null) ? void 0 : _classPrivateFieldLooseBase(_ref9, _x)[_x].toString();
    (_ref10 = (_o12 = _o4 = o) === null || _o12 === void 0 ? void 0 : _o12.Foo, _o4 === void 0 || _o4 === null) ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_ref10, _self)[_self], _x)[_x];
    (_ref11 = (_o13 = _o5 = o) === null || _o13 === void 0 ? void 0 : _o13.Foo, _o5 === void 0 || _o5 === null) ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_ref11, _self)[_self].self, _x)[_x];
    (_ref14 = (_ref44 = _ref13 = (_ref12 = (_o14 = _o6 = o) === null || _o14 === void 0 ? void 0 : _o14.Foo, _o6 === void 0 || _o6 === null) ? void 0 : _classPrivateFieldLooseBase(_ref12, _self)[_self]) === null || _ref44 === void 0 ? void 0 : _ref44.self, _ref13 === void 0 || _ref13 === null) ? void 0 : _classPrivateFieldLooseBase(_ref14, _x)[_x];
    (_ref17 = (_ref45 = _ref16 = (_ref15 = (_o15 = _o7 = o) === null || _o15 === void 0 ? void 0 : _o15.Foo, _o7 === void 0 || _o7 === null) ? void 0 : _classPrivateFieldLooseBase(_ref15, _self)[_self].self) === null || _ref45 === void 0 ? void 0 : _ref45.self, _ref16 === void 0 || _ref16 === null) ? void 0 : _classPrivateFieldLooseBase(_ref17, _x)[_x];
    (_ref20 = (_ref46 = _ref19 = (_ref47 = (_ref18 = (_o16 = _o8 = o) === null || _o16 === void 0 ? void 0 : _o16.Foo, _o8 === void 0 || _o8 === null) ? void 0 : _classPrivateFieldLooseBase(_ref18, _self)[_self]) === null || _ref47 === void 0 ? void 0 : _ref47.self) === null || _ref46 === void 0 ? void 0 : _ref46.self, _ref19 === void 0 || _ref19 === null) ? void 0 : _classPrivateFieldLooseBase(_ref20, _x)[_x];
    (_ref21 = (_fn9 = _fn = fn) === null || _fn9 === void 0 ? void 0 : _fn9().Foo, _fn === void 0 || _fn === null) ? void 0 : _classPrivateFieldLooseBase(_ref21, _x)[_x];
    (_ref22 = (_fn10 = _fn2 = fn) === null || _fn10 === void 0 ? void 0 : _fn10().Foo, _fn2 === void 0 || _fn2 === null) ? void 0 : _classPrivateFieldLooseBase(_ref22, _x)[_x].toString;
    (_ref23 = (_fn11 = _fn3 = fn) === null || _fn11 === void 0 ? void 0 : _fn11().Foo, _fn3 === void 0 || _fn3 === null) ? void 0 : _classPrivateFieldLooseBase(_ref23, _x)[_x].toString();
    (_ref25 = (_ref48 = _ref24 = fnDeep === null || fnDeep === void 0 ? void 0 : fnDeep().very.o) === null || _ref48 === void 0 ? void 0 : _ref48.Foo, _ref24 === void 0 || _ref24 === null) ? void 0 : _classPrivateFieldLooseBase(_ref25, _x)[_x];
    (_ref27 = (_ref49 = _ref26 = fnDeep === null || fnDeep === void 0 ? void 0 : fnDeep().very.o) === null || _ref49 === void 0 ? void 0 : _ref49.Foo, _ref26 === void 0 || _ref26 === null) ? void 0 : _classPrivateFieldLooseBase(_ref27, _x)[_x].toString;
    (_ref29 = (_ref50 = _ref28 = fnDeep === null || fnDeep === void 0 ? void 0 : fnDeep().very.o) === null || _ref50 === void 0 ? void 0 : _ref50.Foo, _ref28 === void 0 || _ref28 === null) ? void 0 : _classPrivateFieldLooseBase(_ref29, _x)[_x].toString();
    (_ref30 = (_fn12 = _fn4 = fn) === null || _fn12 === void 0 ? void 0 : _fn12().Foo, _fn4 === void 0 || _fn4 === null) ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_ref30, _self)[_self], _x)[_x];
    (_ref31 = (_fn13 = _fn5 = fn) === null || _fn13 === void 0 ? void 0 : _fn13().Foo, _fn5 === void 0 || _fn5 === null) ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_ref31, _self)[_self].self, _x)[_x];
    (_ref34 = (_ref51 = _ref33 = (_ref32 = (_fn14 = _fn6 = fn) === null || _fn14 === void 0 ? void 0 : _fn14().Foo, _fn6 === void 0 || _fn6 === null) ? void 0 : _classPrivateFieldLooseBase(_ref32, _self)[_self]) === null || _ref51 === void 0 ? void 0 : _ref51.self, _ref33 === void 0 || _ref33 === null) ? void 0 : _classPrivateFieldLooseBase(_ref34, _x)[_x];
    (_ref37 = (_ref52 = _ref36 = (_ref35 = (_fn15 = _fn7 = fn) === null || _fn15 === void 0 ? void 0 : _fn15().Foo, _fn7 === void 0 || _fn7 === null) ? void 0 : _classPrivateFieldLooseBase(_ref35, _self)[_self].self) === null || _ref52 === void 0 ? void 0 : _ref52.self, _ref36 === void 0 || _ref36 === null) ? void 0 : _classPrivateFieldLooseBase(_ref37, _x)[_x];
    (_ref40 = (_ref53 = _ref39 = (_ref54 = (_ref38 = (_fn16 = _fn8 = fn) === null || _fn16 === void 0 ? void 0 : _fn16().Foo, _fn8 === void 0 || _fn8 === null) ? void 0 : _classPrivateFieldLooseBase(_ref38, _self)[_self]) === null || _ref54 === void 0 ? void 0 : _ref54.self) === null || _ref53 === void 0 ? void 0 : _ref53.self, _ref39 === void 0 || _ref39 === null) ? void 0 : _classPrivateFieldLooseBase(_ref40, _x)[_x];
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
