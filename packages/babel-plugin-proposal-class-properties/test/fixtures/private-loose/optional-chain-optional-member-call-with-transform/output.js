function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o$Foo, _o$Foo2, _o$Foo3, _deep$very$o$Foo, _deep$very$o$Foo2, _deep$very$o$Foo3, _ref, _ref2, _self2, _self3, _self$self, _ref3, _classPrivateFieldLoo, _call, _getSelf, _getSelf2, _self4, _classPrivateFieldLoo2, _call$self, _getSelf$self, _getSelf$self2, _fn$Foo, _fn$Foo2, _fn$Foo3, _fnDeep$very$o$Foo, _fnDeep$very$o$Foo2, _fnDeep$very$o$Foo3, _ref4, _ref5, _self5, _self6, _self$self2, _ref6, _classPrivateFieldLoo3, _call2, _getSelf3, _getSelf4, _self7, _classPrivateFieldLoo4, _call$self2, _getSelf$self3, _getSelf$self4, _deep$very$o, _deep$very$o2, _deep$very$o3, _ref7, _ref8, _ref9, _ref9$self, _ref10, _ref11, _ref12, _ref13, _ref14, _ref14$call, _ref15, _ref15$getSelf, _ref16, _ref16$getSelf, _fnDeep$very$o, _fnDeep$very$o2, _fnDeep$very$o3, _ref17, _ref18, _ref19, _ref19$self, _ref20, _ref21, _ref22, _ref23, _ref24, _ref24$call, _ref25, _ref25$getSelf, _ref26, _ref26$getSelf;

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

    Foo === null || Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(Foo, _m)[_m]();
    Foo === null || Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(Foo, _m)[_m]().toString;
    Foo === null || Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(Foo, _m)[_m]().toString();
    (_o$Foo = o == null ? void 0 : o.Foo) === null || _o$Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(_o$Foo, _m)[_m]();
    (_o$Foo2 = o == null ? void 0 : o.Foo) === null || _o$Foo2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o$Foo2, _m)[_m]().toString;
    (_o$Foo3 = o == null ? void 0 : o.Foo) === null || _o$Foo3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o$Foo3, _m)[_m]().toString();
    (_deep$very$o$Foo = deep == null ? void 0 : (_deep$very$o = deep.very.o) == null ? void 0 : _deep$very$o.Foo) === null || _deep$very$o$Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(_deep$very$o$Foo, _m)[_m]();
    (_deep$very$o$Foo2 = deep == null ? void 0 : (_deep$very$o2 = deep.very.o) == null ? void 0 : _deep$very$o2.Foo) === null || _deep$very$o$Foo2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_deep$very$o$Foo2, _m)[_m]().toString;
    (_deep$very$o$Foo3 = deep == null ? void 0 : (_deep$very$o3 = deep.very.o) == null ? void 0 : _deep$very$o3.Foo) === null || _deep$very$o$Foo3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_deep$very$o$Foo3, _m)[_m]().toString();
    (_ref = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) === null || _ref === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref, _m)[_m]();
    (_ref2 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].self) === null || _ref2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref2, _m)[_m]();
    (_self2 = (_ref7 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? void 0 : _ref7.self) === null || _self2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self2, _m)[_m]();
    (_self3 = (_ref8 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].self) == null ? void 0 : _ref8.self) === null || _self3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self3, _m)[_m]();
    (_self$self = (_ref9 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? void 0 : (_ref9$self = _ref9.self) == null ? void 0 : _ref9$self.self) === null || _self$self === void 0 ? void 0 : _classPrivateFieldLooseBase(_self$self, _m)[_m]();
    (_ref3 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf()) === null || _ref3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref3, _m)[_m]();
    (_call = (_ref10 = o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo = _classPrivateFieldLooseBase(o.Foo, _self)[_self]).getSelf) == null ? void 0 : _ref10.call(_classPrivateFieldLoo)) === null || _call === void 0 ? void 0 : _classPrivateFieldLooseBase(_call, _m)[_m]();
    (_getSelf = (_ref11 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? void 0 : _ref11.getSelf()) === null || _getSelf === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf, _m)[_m]();
    (_getSelf2 = (_ref12 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? void 0 : _ref12.getSelf == null ? void 0 : _ref12.getSelf()) === null || _getSelf2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf2, _m)[_m]();
    (_self4 = (_ref13 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf()) == null ? void 0 : _ref13.self) === null || _self4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self4, _m)[_m]();
    (_call$self = (_ref14 = o === null || o === void 0 ? void 0 : (_classPrivateFieldLoo2 = _classPrivateFieldLooseBase(o.Foo, _self)[_self]).getSelf) == null ? void 0 : (_ref14$call = _ref14.call(_classPrivateFieldLoo2)) == null ? void 0 : _ref14$call.self) === null || _call$self === void 0 ? void 0 : _classPrivateFieldLooseBase(_call$self, _m)[_m]();
    (_getSelf$self = (_ref15 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? void 0 : (_ref15$getSelf = _ref15.getSelf()) == null ? void 0 : _ref15$getSelf.self) === null || _getSelf$self === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf$self, _m)[_m]();
    (_getSelf$self2 = (_ref16 = o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _self)[_self]) == null ? void 0 : _ref16.getSelf == null ? void 0 : (_ref16$getSelf = _ref16.getSelf()) == null ? void 0 : _ref16$getSelf.self) === null || _getSelf$self2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf$self2, _m)[_m]();
    (_fn$Foo = fn == null ? void 0 : fn().Foo) === null || _fn$Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn$Foo, _m)[_m]();
    (_fn$Foo2 = fn == null ? void 0 : fn().Foo) === null || _fn$Foo2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn$Foo2, _m)[_m]().toString;
    (_fn$Foo3 = fn == null ? void 0 : fn().Foo) === null || _fn$Foo3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn$Foo3, _m)[_m]().toString();
    (_fnDeep$very$o$Foo = fnDeep == null ? void 0 : (_fnDeep$very$o = fnDeep().very.o) == null ? void 0 : _fnDeep$very$o.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(_fnDeep$very$o$Foo, _m)[_m]();
    (_fnDeep$very$o$Foo2 = fnDeep == null ? void 0 : (_fnDeep$very$o2 = fnDeep().very.o) == null ? void 0 : _fnDeep$very$o2.Foo) === null || _fnDeep$very$o$Foo2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fnDeep$very$o$Foo2, _m)[_m]().toString;
    (_fnDeep$very$o$Foo3 = fnDeep == null ? void 0 : (_fnDeep$very$o3 = fnDeep().very.o) == null ? void 0 : _fnDeep$very$o3.Foo) === null || _fnDeep$very$o$Foo3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fnDeep$very$o$Foo3, _m)[_m]().toString();
    (_ref4 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) === null || _ref4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref4, _m)[_m]();
    (_ref5 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].self) === null || _ref5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref5, _m)[_m]();
    (_self5 = (_ref17 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? void 0 : _ref17.self) === null || _self5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self5, _m)[_m]();
    (_self6 = (_ref18 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].self) == null ? void 0 : _ref18.self) === null || _self6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self6, _m)[_m]();
    (_self$self2 = (_ref19 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? void 0 : (_ref19$self = _ref19.self) == null ? void 0 : _ref19$self.self) === null || _self$self2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self$self2, _m)[_m]();
    (_ref6 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf()) === null || _ref6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref6, _m)[_m]();
    (_call2 = (_ref20 = fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo3 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self]).getSelf) == null ? void 0 : _ref20.call(_classPrivateFieldLoo3)) === null || _call2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_call2, _m)[_m]();
    (_getSelf3 = (_ref21 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? void 0 : _ref21.getSelf()) === null || _getSelf3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf3, _m)[_m]();
    (_getSelf4 = (_ref22 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? void 0 : _ref22.getSelf == null ? void 0 : _ref22.getSelf()) === null || _getSelf4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf4, _m)[_m]();
    (_self7 = (_ref23 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf()) == null ? void 0 : _ref23.self) === null || _self7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_self7, _m)[_m]();
    (_call$self2 = (_ref24 = fn === null || fn === void 0 ? void 0 : (_classPrivateFieldLoo4 = _classPrivateFieldLooseBase(fn().Foo, _self)[_self]).getSelf) == null ? void 0 : (_ref24$call = _ref24.call(_classPrivateFieldLoo4)) == null ? void 0 : _ref24$call.self) === null || _call$self2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_call$self2, _m)[_m]();
    (_getSelf$self3 = (_ref25 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? void 0 : (_ref25$getSelf = _ref25.getSelf()) == null ? void 0 : _ref25$getSelf.self) === null || _getSelf$self3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf$self3, _m)[_m]();
    (_getSelf$self4 = (_ref26 = fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self]) == null ? void 0 : _ref26.getSelf == null ? void 0 : (_ref26$getSelf = _ref26.getSelf()) == null ? void 0 : _ref26$getSelf.self) === null || _getSelf$self4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf$self4, _m)[_m]();
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
