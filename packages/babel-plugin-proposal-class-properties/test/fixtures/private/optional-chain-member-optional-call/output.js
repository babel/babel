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

    _classStaticPrivateFieldSpecGet(Foo, Foo, _m)?.();
    _classStaticPrivateFieldSpecGet(Foo, Foo, _m)?.().toString;
    _classStaticPrivateFieldSpecGet(Foo, Foo, _m)?.().toString();

    _classStaticPrivateFieldSpecGet(_o$Foo = o.Foo, Foo, _m).call(_o$Foo);

    _classStaticPrivateFieldSpecGet(_o$Foo2 = o.Foo, Foo, _m).call(_o$Foo2).toString;
    _classStaticPrivateFieldSpecGet(_o$Foo3 = o.Foo, Foo, _m).call(_o$Foo3).toString();

    _classStaticPrivateFieldSpecGet(_deep$very$o$Foo = _deep$very$o.Foo, Foo, _m).call(_deep$very$o$Foo);

    _classStaticPrivateFieldSpecGet(_deep$very$o2$Foo = _deep$very$o2.Foo, Foo, _m).call(_deep$very$o2$Foo).toString;
    _classStaticPrivateFieldSpecGet(_deep$very$o3$Foo = _deep$very$o3.Foo, Foo, _m).call(_deep$very$o3$Foo).toString();
    (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self), Foo, _m))?.call(_classStaticPrivateFi);
    (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self, Foo, _m))?.call(_classStaticPrivateFi2);

    _classStaticPrivateFieldSpecGet(_ref$self = _ref.self, Foo, _m).call(_ref$self);

    _classStaticPrivateFieldSpecGet(_ref2$self = _ref2.self, Foo, _m).call(_ref2$self);

    _classStaticPrivateFieldSpecGet(_self2$self = _self2.self, Foo, _m).call(_self2$self);

    (o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf(), Foo, _m))?.call(_classStaticPrivateFi3);

    _classStaticPrivateFieldSpecGet(_ref3$call = _ref3.call(_classStaticPrivateFi4), Foo, _m).call(_ref3$call);

    _classStaticPrivateFieldSpecGet(_ref4$getSelf = _ref4.getSelf(), Foo, _m).call(_ref4$getSelf);

    _classStaticPrivateFieldSpecGet(_getSelf$call = _getSelf.call(_ref5), Foo, _m).call(_getSelf$call);

    _classStaticPrivateFieldSpecGet(_ref6$self = _ref6.self, Foo, _m).call(_ref6$self);

    _classStaticPrivateFieldSpecGet(_call$self = _call.self, Foo, _m).call(_call$self);

    _classStaticPrivateFieldSpecGet(_getSelf2$self = _getSelf2.self, Foo, _m).call(_getSelf2$self);

    _classStaticPrivateFieldSpecGet(_getSelf3$self = _getSelf3.self, Foo, _m).call(_getSelf3$self);

    _classStaticPrivateFieldSpecGet(_fn$Foo = fn().Foo, Foo, _m).call(_fn$Foo);

    _classStaticPrivateFieldSpecGet(_fn$Foo2 = fn().Foo, Foo, _m).call(_fn$Foo2).toString;
    _classStaticPrivateFieldSpecGet(_fn$Foo3 = fn().Foo, Foo, _m).call(_fn$Foo3).toString();

    _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo = _fnDeep$very$o.Foo, Foo, _m).call(_fnDeep$very$o$Foo);

    _classStaticPrivateFieldSpecGet(_fnDeep$very$o2$Foo = _fnDeep$very$o2.Foo, Foo, _m).call(_fnDeep$very$o2$Foo).toString;
    _classStaticPrivateFieldSpecGet(_fnDeep$very$o3$Foo = _fnDeep$very$o3.Foo, Foo, _m).call(_fnDeep$very$o3$Foo).toString();
    (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi6 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self), Foo, _m))?.call(_classStaticPrivateFi6);
    (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi7 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self, Foo, _m))?.call(_classStaticPrivateFi7);

    _classStaticPrivateFieldSpecGet(_ref7$self = _ref7.self, Foo, _m).call(_ref7$self);

    _classStaticPrivateFieldSpecGet(_ref8$self = _ref8.self, Foo, _m).call(_ref8$self);

    _classStaticPrivateFieldSpecGet(_self3$self = _self3.self, Foo, _m).call(_self3$self);

    (fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi8 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf(), Foo, _m))?.call(_classStaticPrivateFi8);

    _classStaticPrivateFieldSpecGet(_ref9$call = _ref9.call(_classStaticPrivateFi9), Foo, _m).call(_ref9$call);

    _classStaticPrivateFieldSpecGet(_ref10$getSelf = _ref10.getSelf(), Foo, _m).call(_ref10$getSelf);

    _classStaticPrivateFieldSpecGet(_getSelf4$call = _getSelf4.call(_ref11), Foo, _m).call(_getSelf4$call);

    _classStaticPrivateFieldSpecGet(_ref12$self = _ref12.self, Foo, _m).call(_ref12$self);

    _classStaticPrivateFieldSpecGet(_call2$self = _call2.self, Foo, _m).call(_call2$self);

    _classStaticPrivateFieldSpecGet(_getSelf5$self = _getSelf5.self, Foo, _m).call(_getSelf5$self);

    _classStaticPrivateFieldSpecGet(_getSelf6$self = _getSelf6.self, Foo, _m).call(_getSelf6$self);
  }

  static testtest() {
    var _fn, _classStaticPrivateFi11, _ref13, _ref13$call;

    _classStaticPrivateFieldSpecGet(_ref13$call = _ref13.call(_classStaticPrivateFi11), Foo, _m).call(_ref13$call);
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
