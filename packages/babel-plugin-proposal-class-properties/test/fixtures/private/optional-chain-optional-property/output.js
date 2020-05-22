function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _Foo, _Foo2, _Foo3, _o$Foo, _o$Foo2, _o$Foo3, _deep$very$o$Foo, _deep$very$o$Foo2, _deep$very$o$Foo3, _o, _ref, _o2, _ref2, _o3, _self2, _o4, _self3, _o5, _self$self, _o6, _ref3, _o7, _classStaticPrivateFi, _call, _o8, _getSelf, _o9, _getSelf2, _o10, _self4, _o11, _classStaticPrivateFi2, _call$self, _o12, _getSelf$self, _o13, _getSelf$self2, _fn$Foo, _fn$Foo2, _fn$Foo3, _fnDeep$very$o$Foo, _fnDeep$very$o$Foo2, _fnDeep$very$o$Foo3, _fn, _ref4, _fn2, _ref5, _fn3, _self5, _fn4, _self6, _fn5, _self$self2, _fn6, _ref6, _fn7, _classStaticPrivateFi3, _call2, _fn8, _getSelf3, _fn9, _getSelf4, _fn10, _self7, _fn11, _classStaticPrivateFi4, _call$self2, _fn12, _getSelf$self3, _fn13, _getSelf$self4;

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

    (_Foo = Foo) === null || _Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_Foo, Foo, _x);
    (_Foo2 = Foo) === null || _Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_Foo2, Foo, _x).toString;
    (_Foo3 = Foo) === null || _Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_Foo3, Foo, _x).toString();
    (_o$Foo = o?.Foo) === null || _o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo, Foo, _x);
    (_o$Foo2 = o?.Foo) === null || _o$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo2, Foo, _x).toString;
    (_o$Foo3 = o?.Foo) === null || _o$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo3, Foo, _x).toString();
    (_deep$very$o$Foo = deep?.very.o?.Foo) === null || _deep$very$o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o$Foo, Foo, _x);
    (_deep$very$o$Foo2 = deep?.very.o?.Foo) === null || _deep$very$o$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o$Foo2, Foo, _x).toString;
    (_deep$very$o$Foo3 = deep?.very.o?.Foo) === null || _deep$very$o$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o$Foo3, Foo, _x).toString();
    (_ref = (_o = o) === null || _o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o.Foo, Foo, _self)) === null || _ref === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref, Foo, _x);
    (_ref2 = (_o2 = o) === null || _o2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o2.Foo, Foo, _self).self) === null || _ref2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref2, Foo, _x);
    (_self2 = ((_o3 = o) === null || _o3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o3.Foo, Foo, _self))?.self) === null || _self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self2, Foo, _x);
    (_self3 = ((_o4 = o) === null || _o4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o4.Foo, Foo, _self).self)?.self) === null || _self3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self3, Foo, _x);
    (_self$self = ((_o5 = o) === null || _o5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o5.Foo, Foo, _self))?.self?.self) === null || _self$self === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self$self, Foo, _x);
    (_ref3 = (_o6 = o) === null || _o6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o6.Foo, Foo, _self).getSelf()) === null || _ref3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref3, Foo, _x);
    (_call = ((_o7 = o) === null || _o7 === void 0 ? void 0 : (_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(_o7.Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi)) === null || _call === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call, Foo, _x);
    (_getSelf = ((_o8 = o) === null || _o8 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o8.Foo, Foo, _self))?.getSelf()) === null || _getSelf === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf, Foo, _x);
    (_getSelf2 = ((_o9 = o) === null || _o9 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o9.Foo, Foo, _self))?.getSelf?.()) === null || _getSelf2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf2, Foo, _x);
    (_self4 = ((_o10 = o) === null || _o10 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o10.Foo, Foo, _self).getSelf())?.self) === null || _self4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self4, Foo, _x);
    (_call$self = ((_o11 = o) === null || _o11 === void 0 ? void 0 : (_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(_o11.Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi2)?.self) === null || _call$self === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call$self, Foo, _x);
    (_getSelf$self = ((_o12 = o) === null || _o12 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o12.Foo, Foo, _self))?.getSelf()?.self) === null || _getSelf$self === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self, Foo, _x);
    (_getSelf$self2 = ((_o13 = o) === null || _o13 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o13.Foo, Foo, _self))?.getSelf?.()?.self) === null || _getSelf$self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self2, Foo, _x);
    (_fn$Foo = fn?.().Foo) === null || _fn$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo, Foo, _x);
    (_fn$Foo2 = fn?.().Foo) === null || _fn$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo2, Foo, _x).toString;
    (_fn$Foo3 = fn?.().Foo) === null || _fn$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo3, Foo, _x).toString();
    (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo, Foo, _x);
    (_fnDeep$very$o$Foo2 = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo2, Foo, _x).toString;
    (_fnDeep$very$o$Foo3 = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo3, Foo, _x).toString();
    (_ref4 = (_fn = fn) === null || _fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn().Foo, Foo, _self)) === null || _ref4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref4, Foo, _x);
    (_ref5 = (_fn2 = fn) === null || _fn2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn2().Foo, Foo, _self).self) === null || _ref5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref5, Foo, _x);
    (_self5 = ((_fn3 = fn) === null || _fn3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn3().Foo, Foo, _self))?.self) === null || _self5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self5, Foo, _x);
    (_self6 = ((_fn4 = fn) === null || _fn4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn4().Foo, Foo, _self).self)?.self) === null || _self6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self6, Foo, _x);
    (_self$self2 = ((_fn5 = fn) === null || _fn5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn5().Foo, Foo, _self))?.self?.self) === null || _self$self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self$self2, Foo, _x);
    (_ref6 = (_fn6 = fn) === null || _fn6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn6().Foo, Foo, _self).getSelf()) === null || _ref6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref6, Foo, _x);
    (_call2 = ((_fn7 = fn) === null || _fn7 === void 0 ? void 0 : (_classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(_fn7().Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi3)) === null || _call2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call2, Foo, _x);
    (_getSelf3 = ((_fn8 = fn) === null || _fn8 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn8().Foo, Foo, _self))?.getSelf()) === null || _getSelf3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf3, Foo, _x);
    (_getSelf4 = ((_fn9 = fn) === null || _fn9 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn9().Foo, Foo, _self))?.getSelf?.()) === null || _getSelf4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf4, Foo, _x);
    (_self7 = ((_fn10 = fn) === null || _fn10 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn10().Foo, Foo, _self).getSelf())?.self) === null || _self7 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self7, Foo, _x);
    (_call$self2 = ((_fn11 = fn) === null || _fn11 === void 0 ? void 0 : (_classStaticPrivateFi4 = _classStaticPrivateFieldSpecGet(_fn11().Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi4)?.self) === null || _call$self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call$self2, Foo, _x);
    (_getSelf$self3 = ((_fn12 = fn) === null || _fn12 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn12().Foo, Foo, _self))?.getSelf()?.self) === null || _getSelf$self3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self3, Foo, _x);
    (_getSelf$self4 = ((_fn13 = fn) === null || _fn13 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn13().Foo, Foo, _self))?.getSelf?.()?.self) === null || _getSelf$self4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self4, Foo, _x);
  }

}

var _x = {
  writable: true,
  value: 1
};
var _self = {
  writable: true,
  value: Foo
};

_defineProperty(Foo, "self", Foo);

Foo.test();
