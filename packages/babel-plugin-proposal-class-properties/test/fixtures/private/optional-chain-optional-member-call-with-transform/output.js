function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o$Foo, _o$Foo2, _o$Foo3, _deep$very$o$Foo, _deep$very$o$Foo2, _deep$very$o$Foo3, _ref, _ref2, _self2, _self3, _self$self, _ref3, _classStaticPrivateFi, _call, _getSelf, _getSelf2, _self4, _classStaticPrivateFi2, _call$self, _getSelf$self, _getSelf$self2, _fn$Foo, _fn$Foo2, _fn$Foo3, _fnDeep$very$o$Foo, _fnDeep$very$o$Foo2, _fnDeep$very$o$Foo3, _ref4, _ref5, _self5, _self6, _self$self2, _ref6, _classStaticPrivateFi3, _call2, _getSelf3, _getSelf4, _self7, _classStaticPrivateFi4, _call$self2, _getSelf$self3, _getSelf$self4, _deep$very$o, _deep$very$o2, _deep$very$o3, _ref7, _ref8, _ref9, _ref9$self, _ref10, _ref11, _ref12, _ref12$getSelf, _ref13, _ref14, _ref14$call, _ref15, _ref15$getSelf, _ref16, _ref16$getSelf, _ref16$getSelf$call, _fnDeep$very$o, _fnDeep$very$o2, _fnDeep$very$o3, _ref17, _ref18, _ref19, _ref19$self, _ref20, _ref21, _ref22, _ref22$getSelf, _ref23, _ref24, _ref24$call, _ref25, _ref25$getSelf, _ref26, _ref26$getSelf, _ref26$getSelf$call;

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

    Foo === null || Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(Foo, Foo, _m).call(Foo);
    Foo === null || Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(Foo, Foo, _m).call(Foo).toString;
    Foo === null || Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(Foo, Foo, _m).call(Foo).toString();
    (_o$Foo = o === null || o === void 0 ? void 0 : o.Foo) === null || _o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo, Foo, _m).call(_o$Foo);
    (_o$Foo2 = o === null || o === void 0 ? void 0 : o.Foo) === null || _o$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo2, Foo, _m).call(_o$Foo2).toString;
    (_o$Foo3 = o === null || o === void 0 ? void 0 : o.Foo) === null || _o$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo3, Foo, _m).call(_o$Foo3).toString();
    (_deep$very$o$Foo = deep === null || deep === void 0 ? void 0 : (_deep$very$o = deep.very.o) === null || _deep$very$o === void 0 ? void 0 : _deep$very$o.Foo) === null || _deep$very$o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o$Foo, Foo, _m).call(_deep$very$o$Foo);
    (_deep$very$o$Foo2 = deep === null || deep === void 0 ? void 0 : (_deep$very$o2 = deep.very.o) === null || _deep$very$o2 === void 0 ? void 0 : _deep$very$o2.Foo) === null || _deep$very$o$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o$Foo2, Foo, _m).call(_deep$very$o$Foo2).toString;
    (_deep$very$o$Foo3 = deep === null || deep === void 0 ? void 0 : (_deep$very$o3 = deep.very.o) === null || _deep$very$o3 === void 0 ? void 0 : _deep$very$o3.Foo) === null || _deep$very$o$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o$Foo3, Foo, _m).call(_deep$very$o$Foo3).toString();
    (_ref = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref, Foo, _m).call(_ref);
    (_ref2 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self) === null || _ref2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref2, Foo, _m).call(_ref2);
    (_self2 = (_ref7 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref7 === void 0 ? void 0 : _ref7.self) === null || _self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self2, Foo, _m).call(_self2);
    (_self3 = (_ref8 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self) === null || _ref8 === void 0 ? void 0 : _ref8.self) === null || _self3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self3, Foo, _m).call(_self3);
    (_self$self = (_ref9 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref9 === void 0 ? void 0 : (_ref9$self = _ref9.self) === null || _ref9$self === void 0 ? void 0 : _ref9$self.self) === null || _self$self === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self$self, Foo, _m).call(_self$self);
    (_ref3 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf()) === null || _ref3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref3, Foo, _m).call(_ref3);
    (_call = (_ref10 = o === null || o === void 0 ? void 0 : (_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf) === null || _ref10 === void 0 ? void 0 : _ref10.call(_classStaticPrivateFi)) === null || _call === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call, Foo, _m).call(_call);
    (_getSelf = (_ref11 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref11 === void 0 ? void 0 : _ref11.getSelf()) === null || _getSelf === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf, Foo, _m).call(_getSelf);
    (_getSelf2 = (_ref12 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref12 === void 0 ? void 0 : (_ref12$getSelf = _ref12.getSelf) === null || _ref12$getSelf === void 0 ? void 0 : _ref12$getSelf.call(_ref12)) === null || _getSelf2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf2, Foo, _m).call(_getSelf2);
    (_self4 = (_ref13 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf()) === null || _ref13 === void 0 ? void 0 : _ref13.self) === null || _self4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self4, Foo, _m).call(_self4);
    (_call$self = (_ref14 = o === null || o === void 0 ? void 0 : (_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf) === null || _ref14 === void 0 ? void 0 : (_ref14$call = _ref14.call(_classStaticPrivateFi2)) === null || _ref14$call === void 0 ? void 0 : _ref14$call.self) === null || _call$self === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call$self, Foo, _m).call(_call$self);
    (_getSelf$self = (_ref15 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref15 === void 0 ? void 0 : (_ref15$getSelf = _ref15.getSelf()) === null || _ref15$getSelf === void 0 ? void 0 : _ref15$getSelf.self) === null || _getSelf$self === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self, Foo, _m).call(_getSelf$self);
    (_getSelf$self2 = (_ref16 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref16 === void 0 ? void 0 : (_ref16$getSelf = _ref16.getSelf) === null || _ref16$getSelf === void 0 ? void 0 : (_ref16$getSelf$call = _ref16$getSelf.call(_ref16)) === null || _ref16$getSelf$call === void 0 ? void 0 : _ref16$getSelf$call.self) === null || _getSelf$self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self2, Foo, _m).call(_getSelf$self2);
    (_fn$Foo = fn === null || fn === void 0 ? void 0 : fn().Foo) === null || _fn$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo, Foo, _m).call(_fn$Foo);
    (_fn$Foo2 = fn === null || fn === void 0 ? void 0 : fn().Foo) === null || _fn$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo2, Foo, _m).call(_fn$Foo2).toString;
    (_fn$Foo3 = fn === null || fn === void 0 ? void 0 : fn().Foo) === null || _fn$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo3, Foo, _m).call(_fn$Foo3).toString();
    (_fnDeep$very$o$Foo = fnDeep === null || fnDeep === void 0 ? void 0 : (_fnDeep$very$o = fnDeep().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : _fnDeep$very$o.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo, Foo, _m).call(_fnDeep$very$o$Foo);
    (_fnDeep$very$o$Foo2 = fnDeep === null || fnDeep === void 0 ? void 0 : (_fnDeep$very$o2 = fnDeep().very.o) === null || _fnDeep$very$o2 === void 0 ? void 0 : _fnDeep$very$o2.Foo) === null || _fnDeep$very$o$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo2, Foo, _m).call(_fnDeep$very$o$Foo2).toString;
    (_fnDeep$very$o$Foo3 = fnDeep === null || fnDeep === void 0 ? void 0 : (_fnDeep$very$o3 = fnDeep().very.o) === null || _fnDeep$very$o3 === void 0 ? void 0 : _fnDeep$very$o3.Foo) === null || _fnDeep$very$o$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo3, Foo, _m).call(_fnDeep$very$o$Foo3).toString();
    (_ref4 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref4, Foo, _m).call(_ref4);
    (_ref5 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self) === null || _ref5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref5, Foo, _m).call(_ref5);
    (_self5 = (_ref17 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref17 === void 0 ? void 0 : _ref17.self) === null || _self5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self5, Foo, _m).call(_self5);
    (_self6 = (_ref18 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self) === null || _ref18 === void 0 ? void 0 : _ref18.self) === null || _self6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self6, Foo, _m).call(_self6);
    (_self$self2 = (_ref19 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref19 === void 0 ? void 0 : (_ref19$self = _ref19.self) === null || _ref19$self === void 0 ? void 0 : _ref19$self.self) === null || _self$self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self$self2, Foo, _m).call(_self$self2);
    (_ref6 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf()) === null || _ref6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref6, Foo, _m).call(_ref6);
    (_call2 = (_ref20 = fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf) === null || _ref20 === void 0 ? void 0 : _ref20.call(_classStaticPrivateFi3)) === null || _call2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call2, Foo, _m).call(_call2);
    (_getSelf3 = (_ref21 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref21 === void 0 ? void 0 : _ref21.getSelf()) === null || _getSelf3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf3, Foo, _m).call(_getSelf3);
    (_getSelf4 = (_ref22 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref22 === void 0 ? void 0 : (_ref22$getSelf = _ref22.getSelf) === null || _ref22$getSelf === void 0 ? void 0 : _ref22$getSelf.call(_ref22)) === null || _getSelf4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf4, Foo, _m).call(_getSelf4);
    (_self7 = (_ref23 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf()) === null || _ref23 === void 0 ? void 0 : _ref23.self) === null || _self7 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self7, Foo, _m).call(_self7);
    (_call$self2 = (_ref24 = fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi4 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf) === null || _ref24 === void 0 ? void 0 : (_ref24$call = _ref24.call(_classStaticPrivateFi4)) === null || _ref24$call === void 0 ? void 0 : _ref24$call.self) === null || _call$self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call$self2, Foo, _m).call(_call$self2);
    (_getSelf$self3 = (_ref25 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref25 === void 0 ? void 0 : (_ref25$getSelf = _ref25.getSelf()) === null || _ref25$getSelf === void 0 ? void 0 : _ref25$getSelf.self) === null || _getSelf$self3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self3, Foo, _m).call(_getSelf$self3);
    (_getSelf$self4 = (_ref26 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref26 === void 0 ? void 0 : (_ref26$getSelf = _ref26.getSelf) === null || _ref26$getSelf === void 0 ? void 0 : (_ref26$getSelf$call = _ref26$getSelf.call(_ref26)) === null || _ref26$getSelf$call === void 0 ? void 0 : _ref26$getSelf$call.self) === null || _getSelf$self4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self4, Foo, _m).call(_getSelf$self4);
  }

}

var _x = {
  writable: true,
  value: 1
};
var _m = {
  writable: true,
  value: function () {
    return _classStaticPrivateFieldSpecGet(this, Foo, _x);
  }
};
var _self = {
  writable: true,
  value: Foo
};

_defineProperty(Foo, "self", Foo);

Foo.test();
