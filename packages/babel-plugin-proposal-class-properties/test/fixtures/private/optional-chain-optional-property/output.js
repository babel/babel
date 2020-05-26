function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o$Foo, _o$Foo2, _o$Foo3, _deep$very$o$Foo, _deep$very$o$Foo2, _deep$very$o$Foo3, _ref, _ref2, _self2, _self3, _self$self, _ref3, _classStaticPrivateFi, _call, _getSelf, _getSelf2, _self4, _classStaticPrivateFi2, _call$self, _getSelf$self, _getSelf$self2, _fn$Foo, _fn$Foo2, _fn$Foo3, _fnDeep$very$o$Foo, _fnDeep$very$o$Foo2, _fnDeep$very$o$Foo3, _ref4, _ref5, _self5, _self6, _self$self2, _ref6, _classStaticPrivateFi3, _call2, _getSelf3, _getSelf4, _self7, _classStaticPrivateFi4, _call$self2, _getSelf$self3, _getSelf$self4;

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

    Foo === null || Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(Foo, Foo, _x);
    Foo === null || Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(Foo, Foo, _x).toString;
    Foo === null || Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(Foo, Foo, _x).toString();
    (_o$Foo = o?.Foo) === null || _o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo, Foo, _x);
    (_o$Foo2 = o?.Foo) === null || _o$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo2, Foo, _x).toString;
    (_o$Foo3 = o?.Foo) === null || _o$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo3, Foo, _x).toString();
    (_deep$very$o$Foo = deep?.very.o?.Foo) === null || _deep$very$o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o$Foo, Foo, _x);
    (_deep$very$o$Foo2 = deep?.very.o?.Foo) === null || _deep$very$o$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o$Foo2, Foo, _x).toString;
    (_deep$very$o$Foo3 = deep?.very.o?.Foo) === null || _deep$very$o$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o$Foo3, Foo, _x).toString();
    (_ref = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref, Foo, _x);
    (_ref2 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self) === null || _ref2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref2, Foo, _x);
    (_self2 = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.self) === null || _self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self2, Foo, _x);
    (_self3 = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self)?.self) === null || _self3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self3, Foo, _x);
    (_self$self = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.self?.self) === null || _self$self === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self$self, Foo, _x);
    (_ref3 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf()) === null || _ref3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref3, Foo, _x);
    (_call = (o === null || o === void 0 ? void 0 : (_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi)) === null || _call === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call, Foo, _x);
    (_getSelf = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf()) === null || _getSelf === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf, Foo, _x);
    (_getSelf2 = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf?.()) === null || _getSelf2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf2, Foo, _x);
    (_self4 = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf())?.self) === null || _self4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self4, Foo, _x);
    (_call$self = (o === null || o === void 0 ? void 0 : (_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi2)?.self) === null || _call$self === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call$self, Foo, _x);
    (_getSelf$self = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf()?.self) === null || _getSelf$self === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self, Foo, _x);
    (_getSelf$self2 = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf?.()?.self) === null || _getSelf$self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self2, Foo, _x);
    (_fn$Foo = fn?.().Foo) === null || _fn$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo, Foo, _x);
    (_fn$Foo2 = fn?.().Foo) === null || _fn$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo2, Foo, _x).toString;
    (_fn$Foo3 = fn?.().Foo) === null || _fn$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo3, Foo, _x).toString();
    (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo, Foo, _x);
    (_fnDeep$very$o$Foo2 = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo2, Foo, _x).toString;
    (_fnDeep$very$o$Foo3 = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo3, Foo, _x).toString();
    (_ref4 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref4, Foo, _x);
    (_ref5 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self) === null || _ref5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref5, Foo, _x);
    (_self5 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.self) === null || _self5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self5, Foo, _x);
    (_self6 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self)?.self) === null || _self6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self6, Foo, _x);
    (_self$self2 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.self?.self) === null || _self$self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self$self2, Foo, _x);
    (_ref6 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf()) === null || _ref6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref6, Foo, _x);
    (_call2 = (fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi3)) === null || _call2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call2, Foo, _x);
    (_getSelf3 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf()) === null || _getSelf3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf3, Foo, _x);
    (_getSelf4 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf?.()) === null || _getSelf4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf4, Foo, _x);
    (_self7 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf())?.self) === null || _self7 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self7, Foo, _x);
    (_call$self2 = (fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi4 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi4)?.self) === null || _call$self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call$self2, Foo, _x);
    (_getSelf$self3 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf()?.self) === null || _getSelf$self3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self3, Foo, _x);
    (_getSelf$self4 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf?.()?.self) === null || _getSelf$self4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self4, Foo, _x);
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
