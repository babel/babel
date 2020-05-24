function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o$Foo, _o$Foo2, _o$Foo3, _deep$very$o, _deep$very$o$Foo, _deep$very$o2, _deep$very$o2$Foo, _deep$very$o3, _deep$very$o3$Foo, _classStaticPrivateFi, _classStaticPrivateFi2, _ref, _ref$self, _ref2, _ref2$self, _self2, _self2$self, _classStaticPrivateFi3, _classStaticPrivateFi4, _ref3, _ref3$call, _ref4, _ref4$getSelf, _getSelf, _ref5, _getSelf$call, _ref6, _ref6$self, _classStaticPrivateFi5, _call, _call$self, _getSelf2, _getSelf2$self, _getSelf3, _getSelf3$self, _fn$Foo, _fn$Foo2, _fn$Foo3, _fnDeep$very$o, _fnDeep$very$o$Foo, _fnDeep$very$o2, _fnDeep$very$o2$Foo, _fnDeep$very$o3, _fnDeep$very$o3$Foo, _classStaticPrivateFi6, _classStaticPrivateFi7, _ref7, _ref7$self, _ref8, _ref8$self, _self3, _self3$self, _classStaticPrivateFi8, _classStaticPrivateFi9, _ref9, _ref9$call, _ref10, _ref10$getSelf, _getSelf4, _ref11, _getSelf4$call, _ref12, _ref12$self, _classStaticPrivateFi10, _call2, _call2$self, _getSelf5, _getSelf5$self, _getSelf6, _getSelf6$self;

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
    o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo = o.Foo, Foo, _m).call(_o$Foo);
    o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo2 = o.Foo, Foo, _m).call(_o$Foo2).toString;
    o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo3 = o.Foo, Foo, _m).call(_o$Foo3).toString();
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o$Foo = _deep$very$o.Foo, Foo, _m).call(_deep$very$o$Foo);
    (_deep$very$o2 = deep?.very.o) === null || _deep$very$o2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o2$Foo = _deep$very$o2.Foo, Foo, _m).call(_deep$very$o2$Foo).toString;
    (_deep$very$o3 = deep?.very.o) === null || _deep$very$o3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o3$Foo = _deep$very$o3.Foo, Foo, _m).call(_deep$very$o3$Foo).toString();
    o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self), Foo, _m).call(_classStaticPrivateFi);
    o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self, Foo, _m).call(_classStaticPrivateFi2);
    (_ref = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref$self = _ref.self, Foo, _m).call(_ref$self);
    (_ref2 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self) === null || _ref2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref2$self = _ref2.self, Foo, _m).call(_ref2$self);
    (_self2 = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.self) === null || _self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self2$self = _self2.self, Foo, _m).call(_self2$self);
    o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf(), Foo, _m).call(_classStaticPrivateFi3);
    (_ref3 = o === null || o === void 0 ? void 0 : (_classStaticPrivateFi4 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf) === null || _ref3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref3$call = _ref3.call(_classStaticPrivateFi4), Foo, _m).call(_ref3$call);
    (_ref4 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref4$getSelf = _ref4.getSelf(), Foo, _m).call(_ref4$getSelf);
    (_getSelf = (_ref5 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf) === null || _getSelf === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$call = _getSelf.call(_ref5), Foo, _m).call(_getSelf$call);
    (_ref6 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf()) === null || _ref6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref6$self = _ref6.self, Foo, _m).call(_ref6$self);
    (_call = (o === null || o === void 0 ? void 0 : (_classStaticPrivateFi5 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi5)) === null || _call === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call$self = _call.self, Foo, _m).call(_call$self);
    (_getSelf2 = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf()) === null || _getSelf2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf2$self = _getSelf2.self, Foo, _m).call(_getSelf2$self);
    (_getSelf3 = (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self))?.getSelf?.()) === null || _getSelf3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf3$self = _getSelf3.self, Foo, _m).call(_getSelf3$self);
    fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo = fn().Foo, Foo, _m).call(_fn$Foo);
    fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo2 = fn().Foo, Foo, _m).call(_fn$Foo2).toString;
    fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn$Foo3 = fn().Foo, Foo, _m).call(_fn$Foo3).toString();
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo = _fnDeep$very$o.Foo, Foo, _m).call(_fnDeep$very$o$Foo);
    (_fnDeep$very$o2 = fnDeep?.().very.o) === null || _fnDeep$very$o2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o2$Foo = _fnDeep$very$o2.Foo, Foo, _m).call(_fnDeep$very$o2$Foo).toString;
    (_fnDeep$very$o3 = fnDeep?.().very.o) === null || _fnDeep$very$o3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o3$Foo = _fnDeep$very$o3.Foo, Foo, _m).call(_fnDeep$very$o3$Foo).toString();
    fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi6 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self), Foo, _m).call(_classStaticPrivateFi6);
    fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi7 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self, Foo, _m).call(_classStaticPrivateFi7);
    (_ref7 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref7 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref7$self = _ref7.self, Foo, _m).call(_ref7$self);
    (_ref8 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self) === null || _ref8 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref8$self = _ref8.self, Foo, _m).call(_ref8$self);
    (_self3 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.self) === null || _self3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self3$self = _self3.self, Foo, _m).call(_self3$self);
    fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi8 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf(), Foo, _m).call(_classStaticPrivateFi8);
    (_ref9 = fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi9 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf) === null || _ref9 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref9$call = _ref9.call(_classStaticPrivateFi9), Foo, _m).call(_ref9$call);
    (_ref10 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref10 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref10$getSelf = _ref10.getSelf(), Foo, _m).call(_ref10$getSelf);
    (_getSelf4 = (_ref11 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf) === null || _getSelf4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf4$call = _getSelf4.call(_ref11), Foo, _m).call(_getSelf4$call);
    (_ref12 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf()) === null || _ref12 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref12$self = _ref12.self, Foo, _m).call(_ref12$self);
    (_call2 = (fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi10 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi10)) === null || _call2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call2$self = _call2.self, Foo, _m).call(_call2$self);
    (_getSelf5 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf()) === null || _getSelf5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf5$self = _getSelf5.self, Foo, _m).call(_getSelf5$self);
    (_getSelf6 = (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))?.getSelf?.()) === null || _getSelf6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf6$self = _getSelf6.self, Foo, _m).call(_getSelf6$self);
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
