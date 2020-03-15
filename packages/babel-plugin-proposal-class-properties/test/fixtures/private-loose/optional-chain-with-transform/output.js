function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o, _o2, _o3, _deep$very$o, _deep$very$o2, _deep$very$o3, _o4, _o5, _o6, _ref, _o7, _ref2, _o8, _self2, _o9, _o10, _classPrivateFieldLoo, _ref3, _o11, _ref4, _o12, _getSelf, _ref5, _o13, _ref6, _o14, _classPrivateFieldLoo2, _call, _o15, _getSelf2, _o16, _getSelf3, _fn, _fn2, _fn3, _fnDeep$very$o, _fnDeep$very$o2, _fnDeep$very$o3, _fn4, _fn5, _fn6, _ref7, _fn7, _ref8, _fn8, _self3, _fn9, _fn10, _classPrivateFieldLoo3, _ref9, _fn11, _ref10, _fn12, _getSelf4, _ref11, _fn13, _ref12, _fn14, _classPrivateFieldLoo4, _call2, _fn15, _getSelf5, _fn16, _getSelf6, _ref13, _ref14, _ref15, _ref16, _ref17, _ref17$getSelf, _ref18, _ref19, _ref20, _ref21, _ref22, _ref22$getSelf;

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

    (_o = o) === null || _o === void 0 ? void 0 : _classPrivateFieldLooseBase(_o.Foo, _x)[_x];
    (_o2 = o) === null || _o2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o2.Foo, _x)[_x].toString;
    (_o3 = o) === null || _o3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o3.Foo, _x)[_x].toString();
    (_deep$very$o = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _deep$very$o === void 0 ? void 0 : _classPrivateFieldLooseBase(_deep$very$o.Foo, _x)[_x];
    (_deep$very$o2 = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _deep$very$o2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_deep$very$o2.Foo, _x)[_x].toString;
    (_deep$very$o3 = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _deep$very$o3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_deep$very$o3.Foo, _x)[_x].toString();
    (_o4 = o) === null || _o4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_o4.Foo, _self)[_self], _x)[_x];
    (_o5 = o) === null || _o5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_o5.Foo, _self)[_self].self, _x)[_x];
    (_ref = (_o6 = o) === null || _o6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o6.Foo, _self)[_self]) === null || _ref === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref.self, _x)[_x];
    (_ref2 = (_o7 = o) === null || _o7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o7.Foo, _self)[_self].self) === null || _ref2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref2.self, _x)[_x];
    (_self2 = (_ref13 = (_o8 = o) === null || _o8 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o8.Foo, _self)[_self]) === null || _ref13 === void 0 ? void 0 : _ref13.self) === null || _self2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self2.self, _x)[_x];
    (_o9 = o) === null || _o9 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_o9.Foo, _self)[_self].getSelf(), _x)[_x];
    (_ref3 = (_o10 = o) === null || _o10 === void 0 ? void 0 : (_classPrivateFieldLoo = _classPrivateFieldLooseBase(_o10.Foo, _self)[_self]).getSelf) === null || _ref3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref3.call(_classPrivateFieldLoo), _x)[_x];
    (_ref4 = (_o11 = o) === null || _o11 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o11.Foo, _self)[_self]) === null || _ref4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref4.getSelf(), _x)[_x];
    (_getSelf = (_ref14 = _ref5 = (_o12 = o) === null || _o12 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o12.Foo, _self)[_self]) === null || _ref14 === void 0 ? void 0 : _ref14.getSelf) === null || _getSelf === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf.call(_ref5), _x)[_x];
    (_ref6 = (_o13 = o) === null || _o13 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o13.Foo, _self)[_self].getSelf()) === null || _ref6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref6.self, _x)[_x];
    (_call = (_ref15 = (_o14 = o) === null || _o14 === void 0 ? void 0 : (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase(_o14.Foo, _self)[_self]).getSelf) === null || _ref15 === void 0 ? void 0 : _ref15.call(_classPrivateFieldLoo2)) === null || _call === void 0 ? void 0 : _classPrivateFieldLooseBase(_call.self, _x)[_x];
    (_getSelf2 = (_ref16 = (_o15 = o) === null || _o15 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o15.Foo, _self)[_self]) === null || _ref16 === void 0 ? void 0 : _ref16.getSelf()) === null || _getSelf2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf2.self, _x)[_x];
    (_getSelf3 = (_ref17 = (_o16 = o) === null || _o16 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o16.Foo, _self)[_self]) === null || _ref17 === void 0 ? void 0 : (_ref17$getSelf = _ref17.getSelf) === null || _ref17$getSelf === void 0 ? void 0 : _ref17$getSelf.call(_ref17)) === null || _getSelf3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf3.self, _x)[_x];
    (_fn = fn) === null || _fn === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn().Foo, _x)[_x];
    (_fn2 = fn) === null || _fn2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn2().Foo, _x)[_x].toString;
    (_fn3 = fn) === null || _fn3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn3().Foo, _x)[_x].toString();
    (_fnDeep$very$o = fnDeep === null || fnDeep === void 0 ? void 0 : fnDeep().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : _classPrivateFieldLooseBase(_fnDeep$very$o.Foo, _x)[_x];
    (_fnDeep$very$o2 = fnDeep === null || fnDeep === void 0 ? void 0 : fnDeep().very.o) === null || _fnDeep$very$o2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fnDeep$very$o2.Foo, _x)[_x].toString;
    (_fnDeep$very$o3 = fnDeep === null || fnDeep === void 0 ? void 0 : fnDeep().very.o) === null || _fnDeep$very$o3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fnDeep$very$o3.Foo, _x)[_x].toString();
    (_fn4 = fn) === null || _fn4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_fn4().Foo, _self)[_self], _x)[_x];
    (_fn5 = fn) === null || _fn5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_fn5().Foo, _self)[_self].self, _x)[_x];
    (_ref7 = (_fn6 = fn) === null || _fn6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn6().Foo, _self)[_self]) === null || _ref7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref7.self, _x)[_x];
    (_ref8 = (_fn7 = fn) === null || _fn7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn7().Foo, _self)[_self].self) === null || _ref8 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref8.self, _x)[_x];
    (_self3 = (_ref18 = (_fn8 = fn) === null || _fn8 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn8().Foo, _self)[_self]) === null || _ref18 === void 0 ? void 0 : _ref18.self) === null || _self3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self3.self, _x)[_x];
    (_fn9 = fn) === null || _fn9 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_fn9().Foo, _self)[_self].getSelf(), _x)[_x];
    (_ref9 = (_fn10 = fn) === null || _fn10 === void 0 ? void 0 : (_classPrivateFieldLoo3 = _classPrivateFieldLooseBase(_fn10().Foo, _self)[_self]).getSelf) === null || _ref9 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref9.call(_classPrivateFieldLoo3), _x)[_x];
    (_ref10 = (_fn11 = fn) === null || _fn11 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn11().Foo, _self)[_self]) === null || _ref10 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref10.getSelf(), _x)[_x];
    (_getSelf4 = (_ref19 = _ref11 = (_fn12 = fn) === null || _fn12 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn12().Foo, _self)[_self]) === null || _ref19 === void 0 ? void 0 : _ref19.getSelf) === null || _getSelf4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf4.call(_ref11), _x)[_x];
    (_ref12 = (_fn13 = fn) === null || _fn13 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn13().Foo, _self)[_self].getSelf()) === null || _ref12 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref12.self, _x)[_x];
    (_call2 = (_ref20 = (_fn14 = fn) === null || _fn14 === void 0 ? void 0 : (_classPrivateFieldLoo4 = _classPrivateFieldLooseBase(_fn14().Foo, _self)[_self]).getSelf) === null || _ref20 === void 0 ? void 0 : _ref20.call(_classPrivateFieldLoo4)) === null || _call2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_call2.self, _x)[_x];
    (_getSelf5 = (_ref21 = (_fn15 = fn) === null || _fn15 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn15().Foo, _self)[_self]) === null || _ref21 === void 0 ? void 0 : _ref21.getSelf()) === null || _getSelf5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf5.self, _x)[_x];
    (_getSelf6 = (_ref22 = (_fn16 = fn) === null || _fn16 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn16().Foo, _self)[_self]) === null || _ref22 === void 0 ? void 0 : (_ref22$getSelf = _ref22.getSelf) === null || _ref22$getSelf === void 0 ? void 0 : _ref22$getSelf.call(_ref22)) === null || _getSelf6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf6.self, _x)[_x];
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
