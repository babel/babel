function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o, _o2, _o3, _ref, _ref2, _ref3, _o4, _o5, _o6, _ref4, _o7, _ref5, _o8, _ref6, _o9, _o10, _classPrivateFieldLoo, _ref7, _o11, _ref8, _o12, _ref9, _ref10, _o13, _ref11, _o14, _classPrivateFieldLoo2, _ref12, _o15, _ref13, _o16, _ref14, _fn, _fn2, _fn3, _ref15, _ref16, _ref17, _fn4, _fn5, _fn6, _ref18, _fn7, _ref19, _fn8, _ref20, _fn9, _fn10, _classPrivateFieldLoo3, _ref21, _fn11, _ref22, _fn12, _ref23, _ref24, _fn13, _ref25, _fn14, _classPrivateFieldLoo4, _ref26, _fn15, _ref27, _fn16, _ref28;

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

    (_o = o) === null || _o === void 0 ? void 0 : _classPrivateFieldLooseBase(_o.Foo, _m)[_m]();
    (_o2 = o) === null || _o2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o2.Foo, _m)[_m]().toString;
    (_o3 = o) === null || _o3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o3.Foo, _m)[_m]().toString();
    (_ref = deep?.very.o) === null || _ref === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref.Foo, _m)[_m]();
    (_ref2 = deep?.very.o) === null || _ref2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref2.Foo, _m)[_m]().toString;
    (_ref3 = deep?.very.o) === null || _ref3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref3.Foo, _m)[_m]().toString();
    (_o4 = o) === null || _o4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_o4.Foo, _self)[_self], _m)[_m]();
    (_o5 = o) === null || _o5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_o5.Foo, _self)[_self].self, _m)[_m]();
    (_ref4 = (_o6 = o) === null || _o6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o6.Foo, _self)[_self]) === null || _ref4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref4.self, _m)[_m]();
    (_ref5 = (_o7 = o) === null || _o7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o7.Foo, _self)[_self].self) === null || _ref5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref5.self, _m)[_m]();
    (_ref6 = ((_o8 = o) === null || _o8 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o8.Foo, _self)[_self])?.self) === null || _ref6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref6.self, _m)[_m]();
    (_o9 = o) === null || _o9 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_o9.Foo, _self)[_self].getSelf(), _m)[_m]();
    (_ref7 = (_o10 = o) === null || _o10 === void 0 ? void 0 : (_classPrivateFieldLoo = _classPrivateFieldLooseBase(_o10.Foo, _self)[_self]).getSelf) === null || _ref7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref7.call(_classPrivateFieldLoo), _m)[_m]();
    (_ref8 = (_o11 = o) === null || _o11 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o11.Foo, _self)[_self]) === null || _ref8 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref8.getSelf(), _m)[_m]();
    (_ref9 = (_ref10 = (_o12 = o) === null || _o12 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o12.Foo, _self)[_self])?.getSelf) === null || _ref9 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref9.call(_ref10), _m)[_m]();
    (_ref11 = (_o13 = o) === null || _o13 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o13.Foo, _self)[_self].getSelf()) === null || _ref11 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref11.self, _m)[_m]();
    (_ref12 = ((_o14 = o) === null || _o14 === void 0 ? void 0 : (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase(_o14.Foo, _self)[_self]).getSelf)?.call(_classPrivateFieldLoo2)) === null || _ref12 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref12.self, _m)[_m]();
    (_ref13 = ((_o15 = o) === null || _o15 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o15.Foo, _self)[_self])?.getSelf()) === null || _ref13 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref13.self, _m)[_m]();
    (_ref14 = ((_o16 = o) === null || _o16 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o16.Foo, _self)[_self])?.getSelf?.()) === null || _ref14 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref14.self, _m)[_m]();
    (_fn = fn) === null || _fn === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn().Foo, _m)[_m]();
    (_fn2 = fn) === null || _fn2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn2().Foo, _m)[_m]().toString;
    (_fn3 = fn) === null || _fn3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn3().Foo, _m)[_m]().toString();
    (_ref15 = fnDeep?.().very.o) === null || _ref15 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref15.Foo, _m)[_m]();
    (_ref16 = fnDeep?.().very.o) === null || _ref16 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref16.Foo, _m)[_m]().toString;
    (_ref17 = fnDeep?.().very.o) === null || _ref17 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref17.Foo, _m)[_m]().toString();
    (_fn4 = fn) === null || _fn4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_fn4().Foo, _self)[_self], _m)[_m]();
    (_fn5 = fn) === null || _fn5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_fn5().Foo, _self)[_self].self, _m)[_m]();
    (_ref18 = (_fn6 = fn) === null || _fn6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn6().Foo, _self)[_self]) === null || _ref18 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref18.self, _m)[_m]();
    (_ref19 = (_fn7 = fn) === null || _fn7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn7().Foo, _self)[_self].self) === null || _ref19 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref19.self, _m)[_m]();
    (_ref20 = ((_fn8 = fn) === null || _fn8 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn8().Foo, _self)[_self])?.self) === null || _ref20 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref20.self, _m)[_m]();
    (_fn9 = fn) === null || _fn9 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_fn9().Foo, _self)[_self].getSelf(), _m)[_m]();
    (_ref21 = (_fn10 = fn) === null || _fn10 === void 0 ? void 0 : (_classPrivateFieldLoo3 = _classPrivateFieldLooseBase(_fn10().Foo, _self)[_self]).getSelf) === null || _ref21 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref21.call(_classPrivateFieldLoo3), _m)[_m]();
    (_ref22 = (_fn11 = fn) === null || _fn11 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn11().Foo, _self)[_self]) === null || _ref22 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref22.getSelf(), _m)[_m]();
    (_ref23 = (_ref24 = (_fn12 = fn) === null || _fn12 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn12().Foo, _self)[_self])?.getSelf) === null || _ref23 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref23.call(_ref24), _m)[_m]();
    (_ref25 = (_fn13 = fn) === null || _fn13 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn13().Foo, _self)[_self].getSelf()) === null || _ref25 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref25.self, _m)[_m]();
    (_ref26 = ((_fn14 = fn) === null || _fn14 === void 0 ? void 0 : (_classPrivateFieldLoo4 = _classPrivateFieldLooseBase(_fn14().Foo, _self)[_self]).getSelf)?.call(_classPrivateFieldLoo4)) === null || _ref26 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref26.self, _m)[_m]();
    (_ref27 = ((_fn15 = fn) === null || _fn15 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn15().Foo, _self)[_self])?.getSelf()) === null || _ref27 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref27.self, _m)[_m]();
    (_ref28 = ((_fn16 = fn) === null || _fn16 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn16().Foo, _self)[_self])?.getSelf?.()) === null || _ref28 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref28.self, _m)[_m]();
  }

}

var _x = _classPrivateFieldLooseKey("x");

var _m = _classPrivateFieldLooseKey("m");

var _self = _classPrivateFieldLooseKey("self");

Object.defineProperty(Foo, _x, {
  writable: true,
  value: 1
});
Object.defineProperty(Foo, _m, {
  writable: true,
  value: function () {
    return _classPrivateFieldLooseBase(this, _x)[_x];
  }
});
Object.defineProperty(Foo, _self, {
  writable: true,
  value: Foo
});
Foo.self = Foo;
Foo.test();
