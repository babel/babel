function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o$Foo, _o$Foo2, _o$Foo3, _deep$very$o, _deep$very$o$Foo, _deep$very$o2, _deep$very$o2$Foo, _deep$very$o3, _deep$very$o3$Foo, _classStaticPrivateFi, _classStaticPrivateFi2, _ref, _ref$self, _ref2, _ref2$self, _self2, _self2$self, _classStaticPrivateFi3, _classStaticPrivateFi4, _ref3, _ref3$call, _ref4, _ref4$getSelf, _getSelf, _ref5, _getSelf$call, _ref6, _ref6$self, _classStaticPrivateFi5, _call, _call$self, _getSelf2, _getSelf2$self, _getSelf3, _getSelf3$self, _fn$Foo, _fn$Foo2, _fn$Foo3, _fnDeep$very$o, _fnDeep$very$o$Foo, _fnDeep$very$o2, _fnDeep$very$o2$Foo, _fnDeep$very$o3, _fnDeep$very$o3$Foo, _classStaticPrivateFi6, _classStaticPrivateFi7, _ref7, _ref7$self, _ref8, _ref8$self, _self3, _self3$self, _classStaticPrivateFi8, _classStaticPrivateFi9, _ref9, _ref9$call, _ref10, _ref10$getSelf, _getSelf4, _ref11, _getSelf4$call, _ref12, _ref12$self, _classStaticPrivateFi10, _call2, _call2$self, _getSelf5, _getSelf5$self, _getSelf6, _getSelf6$self, _classStaticPrivateFi11, _classStaticPrivateFi12, _classStaticPrivateFi13, _classStaticPrivateFi14, _classStaticPrivateFi15, _classStaticPrivateFi16, _classStaticPrivateFi17, _classStaticPrivateFi18, _classStaticPrivateFi19, _ref13, _ref14, _classStaticPrivateFi20, _classStaticPrivateFi21, _ref15, _classStaticPrivateFi22, _ref16, _classStaticPrivateFi23, _classStaticPrivateFi24, _ref17, _classStaticPrivateFi25, _classStaticPrivateFi26, _ref18, _classStaticPrivateFi27, _ref19, _classStaticPrivateFi28, _ref20, _ref20$getSelf, _classStaticPrivateFi29, _classStaticPrivateFi30, _classStaticPrivateFi31, _classStaticPrivateFi32, _classStaticPrivateFi33, _classStaticPrivateFi34, _classStaticPrivateFi35, _ref21, _ref22, _classStaticPrivateFi36, _classStaticPrivateFi37, _ref23, _classStaticPrivateFi38, _ref24, _classStaticPrivateFi39, _classStaticPrivateFi40, _ref25, _classStaticPrivateFi41, _classStaticPrivateFi42, _ref26, _classStaticPrivateFi43, _ref27, _classStaticPrivateFi44, _ref28, _ref28$getSelf, _classStaticPrivateFi45;

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

    (_classStaticPrivateFi11 = _classStaticPrivateFieldSpecGet(Foo, Foo, _m)) === null || _classStaticPrivateFi11 === void 0 ? void 0 : _classStaticPrivateFi11.call(Foo);
    (_classStaticPrivateFi12 = _classStaticPrivateFieldSpecGet(Foo, Foo, _m)) === null || _classStaticPrivateFi12 === void 0 ? void 0 : _classStaticPrivateFi12.call(Foo).toString;
    (_classStaticPrivateFi13 = _classStaticPrivateFieldSpecGet(Foo, Foo, _m)) === null || _classStaticPrivateFi13 === void 0 ? void 0 : _classStaticPrivateFi13.call(Foo).toString();
    o === null || o === void 0 ? void 0 : (_classStaticPrivateFi14 = _classStaticPrivateFieldSpecGet(_o$Foo = o.Foo, Foo, _m)) === null || _classStaticPrivateFi14 === void 0 ? void 0 : _classStaticPrivateFi14.call(_o$Foo);
    o === null || o === void 0 ? void 0 : (_classStaticPrivateFi15 = _classStaticPrivateFieldSpecGet(_o$Foo2 = o.Foo, Foo, _m)) === null || _classStaticPrivateFi15 === void 0 ? void 0 : _classStaticPrivateFi15.call(_o$Foo2).toString;
    o === null || o === void 0 ? void 0 : (_classStaticPrivateFi16 = _classStaticPrivateFieldSpecGet(_o$Foo3 = o.Foo, Foo, _m)) === null || _classStaticPrivateFi16 === void 0 ? void 0 : _classStaticPrivateFi16.call(_o$Foo3).toString();
    (_deep$very$o = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _deep$very$o === void 0 ? void 0 : (_classStaticPrivateFi17 = _classStaticPrivateFieldSpecGet(_deep$very$o$Foo = _deep$very$o.Foo, Foo, _m)) === null || _classStaticPrivateFi17 === void 0 ? void 0 : _classStaticPrivateFi17.call(_deep$very$o$Foo);
    (_deep$very$o2 = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _deep$very$o2 === void 0 ? void 0 : (_classStaticPrivateFi18 = _classStaticPrivateFieldSpecGet(_deep$very$o2$Foo = _deep$very$o2.Foo, Foo, _m)) === null || _classStaticPrivateFi18 === void 0 ? void 0 : _classStaticPrivateFi18.call(_deep$very$o2$Foo).toString;
    (_deep$very$o3 = deep === null || deep === void 0 ? void 0 : deep.very.o) === null || _deep$very$o3 === void 0 ? void 0 : (_classStaticPrivateFi19 = _classStaticPrivateFieldSpecGet(_deep$very$o3$Foo = _deep$very$o3.Foo, Foo, _m)) === null || _classStaticPrivateFi19 === void 0 ? void 0 : _classStaticPrivateFi19.call(_deep$very$o3$Foo).toString();
    (_ref13 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self), Foo, _m)) === null || _ref13 === void 0 ? void 0 : _ref13.call(_classStaticPrivateFi);
    (_ref14 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self, Foo, _m)) === null || _ref14 === void 0 ? void 0 : _ref14.call(_classStaticPrivateFi2);
    (_ref = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref === void 0 ? void 0 : (_classStaticPrivateFi20 = _classStaticPrivateFieldSpecGet(_ref$self = _ref.self, Foo, _m)) === null || _classStaticPrivateFi20 === void 0 ? void 0 : _classStaticPrivateFi20.call(_ref$self);
    (_ref2 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).self) === null || _ref2 === void 0 ? void 0 : (_classStaticPrivateFi21 = _classStaticPrivateFieldSpecGet(_ref2$self = _ref2.self, Foo, _m)) === null || _classStaticPrivateFi21 === void 0 ? void 0 : _classStaticPrivateFi21.call(_ref2$self);
    (_self2 = (_ref15 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref15 === void 0 ? void 0 : _ref15.self) === null || _self2 === void 0 ? void 0 : (_classStaticPrivateFi22 = _classStaticPrivateFieldSpecGet(_self2$self = _self2.self, Foo, _m)) === null || _classStaticPrivateFi22 === void 0 ? void 0 : _classStaticPrivateFi22.call(_self2$self);
    (_ref16 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf(), Foo, _m)) === null || _ref16 === void 0 ? void 0 : _ref16.call(_classStaticPrivateFi3);
    (_ref3 = o === null || o === void 0 ? void 0 : (_classStaticPrivateFi4 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf) === null || _ref3 === void 0 ? void 0 : (_classStaticPrivateFi23 = _classStaticPrivateFieldSpecGet(_ref3$call = _ref3.call(_classStaticPrivateFi4), Foo, _m)) === null || _classStaticPrivateFi23 === void 0 ? void 0 : _classStaticPrivateFi23.call(_ref3$call);
    (_ref4 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref4 === void 0 ? void 0 : (_classStaticPrivateFi24 = _classStaticPrivateFieldSpecGet(_ref4$getSelf = _ref4.getSelf(), Foo, _m)) === null || _classStaticPrivateFi24 === void 0 ? void 0 : _classStaticPrivateFi24.call(_ref4$getSelf);
    (_getSelf = (_ref17 = _ref5 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref17 === void 0 ? void 0 : _ref17.getSelf) === null || _getSelf === void 0 ? void 0 : (_classStaticPrivateFi25 = _classStaticPrivateFieldSpecGet(_getSelf$call = _getSelf.call(_ref5), Foo, _m)) === null || _classStaticPrivateFi25 === void 0 ? void 0 : _classStaticPrivateFi25.call(_getSelf$call);
    (_ref6 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf()) === null || _ref6 === void 0 ? void 0 : (_classStaticPrivateFi26 = _classStaticPrivateFieldSpecGet(_ref6$self = _ref6.self, Foo, _m)) === null || _classStaticPrivateFi26 === void 0 ? void 0 : _classStaticPrivateFi26.call(_ref6$self);
    (_call = (_ref18 = o === null || o === void 0 ? void 0 : (_classStaticPrivateFi5 = _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)).getSelf) === null || _ref18 === void 0 ? void 0 : _ref18.call(_classStaticPrivateFi5)) === null || _call === void 0 ? void 0 : (_classStaticPrivateFi27 = _classStaticPrivateFieldSpecGet(_call$self = _call.self, Foo, _m)) === null || _classStaticPrivateFi27 === void 0 ? void 0 : _classStaticPrivateFi27.call(_call$self);
    (_getSelf2 = (_ref19 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref19 === void 0 ? void 0 : _ref19.getSelf()) === null || _getSelf2 === void 0 ? void 0 : (_classStaticPrivateFi28 = _classStaticPrivateFieldSpecGet(_getSelf2$self = _getSelf2.self, Foo, _m)) === null || _classStaticPrivateFi28 === void 0 ? void 0 : _classStaticPrivateFi28.call(_getSelf2$self);
    (_getSelf3 = (_ref20 = o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(o.Foo, Foo, _self)) === null || _ref20 === void 0 ? void 0 : (_ref20$getSelf = _ref20.getSelf) === null || _ref20$getSelf === void 0 ? void 0 : _ref20$getSelf.call(_ref20)) === null || _getSelf3 === void 0 ? void 0 : (_classStaticPrivateFi29 = _classStaticPrivateFieldSpecGet(_getSelf3$self = _getSelf3.self, Foo, _m)) === null || _classStaticPrivateFi29 === void 0 ? void 0 : _classStaticPrivateFi29.call(_getSelf3$self);
    fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi30 = _classStaticPrivateFieldSpecGet(_fn$Foo = fn().Foo, Foo, _m)) === null || _classStaticPrivateFi30 === void 0 ? void 0 : _classStaticPrivateFi30.call(_fn$Foo);
    fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi31 = _classStaticPrivateFieldSpecGet(_fn$Foo2 = fn().Foo, Foo, _m)) === null || _classStaticPrivateFi31 === void 0 ? void 0 : _classStaticPrivateFi31.call(_fn$Foo2).toString;
    fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi32 = _classStaticPrivateFieldSpecGet(_fn$Foo3 = fn().Foo, Foo, _m)) === null || _classStaticPrivateFi32 === void 0 ? void 0 : _classStaticPrivateFi32.call(_fn$Foo3).toString();
    (_fnDeep$very$o = fnDeep === null || fnDeep === void 0 ? void 0 : fnDeep().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : (_classStaticPrivateFi33 = _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo = _fnDeep$very$o.Foo, Foo, _m)) === null || _classStaticPrivateFi33 === void 0 ? void 0 : _classStaticPrivateFi33.call(_fnDeep$very$o$Foo);
    (_fnDeep$very$o2 = fnDeep === null || fnDeep === void 0 ? void 0 : fnDeep().very.o) === null || _fnDeep$very$o2 === void 0 ? void 0 : (_classStaticPrivateFi34 = _classStaticPrivateFieldSpecGet(_fnDeep$very$o2$Foo = _fnDeep$very$o2.Foo, Foo, _m)) === null || _classStaticPrivateFi34 === void 0 ? void 0 : _classStaticPrivateFi34.call(_fnDeep$very$o2$Foo).toString;
    (_fnDeep$very$o3 = fnDeep === null || fnDeep === void 0 ? void 0 : fnDeep().very.o) === null || _fnDeep$very$o3 === void 0 ? void 0 : (_classStaticPrivateFi35 = _classStaticPrivateFieldSpecGet(_fnDeep$very$o3$Foo = _fnDeep$very$o3.Foo, Foo, _m)) === null || _classStaticPrivateFi35 === void 0 ? void 0 : _classStaticPrivateFi35.call(_fnDeep$very$o3$Foo).toString();
    (_ref21 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi6 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self), Foo, _m)) === null || _ref21 === void 0 ? void 0 : _ref21.call(_classStaticPrivateFi6);
    (_ref22 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi7 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self, Foo, _m)) === null || _ref22 === void 0 ? void 0 : _ref22.call(_classStaticPrivateFi7);
    (_ref7 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref7 === void 0 ? void 0 : (_classStaticPrivateFi36 = _classStaticPrivateFieldSpecGet(_ref7$self = _ref7.self, Foo, _m)) === null || _classStaticPrivateFi36 === void 0 ? void 0 : _classStaticPrivateFi36.call(_ref7$self);
    (_ref8 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).self) === null || _ref8 === void 0 ? void 0 : (_classStaticPrivateFi37 = _classStaticPrivateFieldSpecGet(_ref8$self = _ref8.self, Foo, _m)) === null || _classStaticPrivateFi37 === void 0 ? void 0 : _classStaticPrivateFi37.call(_ref8$self);
    (_self3 = (_ref23 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref23 === void 0 ? void 0 : _ref23.self) === null || _self3 === void 0 ? void 0 : (_classStaticPrivateFi38 = _classStaticPrivateFieldSpecGet(_self3$self = _self3.self, Foo, _m)) === null || _classStaticPrivateFi38 === void 0 ? void 0 : _classStaticPrivateFi38.call(_self3$self);
    (_ref24 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi8 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf(), Foo, _m)) === null || _ref24 === void 0 ? void 0 : _ref24.call(_classStaticPrivateFi8);
    (_ref9 = fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi9 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf) === null || _ref9 === void 0 ? void 0 : (_classStaticPrivateFi39 = _classStaticPrivateFieldSpecGet(_ref9$call = _ref9.call(_classStaticPrivateFi9), Foo, _m)) === null || _classStaticPrivateFi39 === void 0 ? void 0 : _classStaticPrivateFi39.call(_ref9$call);
    (_ref10 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref10 === void 0 ? void 0 : (_classStaticPrivateFi40 = _classStaticPrivateFieldSpecGet(_ref10$getSelf = _ref10.getSelf(), Foo, _m)) === null || _classStaticPrivateFi40 === void 0 ? void 0 : _classStaticPrivateFi40.call(_ref10$getSelf);
    (_getSelf4 = (_ref25 = _ref11 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref25 === void 0 ? void 0 : _ref25.getSelf) === null || _getSelf4 === void 0 ? void 0 : (_classStaticPrivateFi41 = _classStaticPrivateFieldSpecGet(_getSelf4$call = _getSelf4.call(_ref11), Foo, _m)) === null || _classStaticPrivateFi41 === void 0 ? void 0 : _classStaticPrivateFi41.call(_getSelf4$call);
    (_ref12 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf()) === null || _ref12 === void 0 ? void 0 : (_classStaticPrivateFi42 = _classStaticPrivateFieldSpecGet(_ref12$self = _ref12.self, Foo, _m)) === null || _classStaticPrivateFi42 === void 0 ? void 0 : _classStaticPrivateFi42.call(_ref12$self);
    (_call2 = (_ref26 = fn === null || fn === void 0 ? void 0 : (_classStaticPrivateFi10 = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)).getSelf) === null || _ref26 === void 0 ? void 0 : _ref26.call(_classStaticPrivateFi10)) === null || _call2 === void 0 ? void 0 : (_classStaticPrivateFi43 = _classStaticPrivateFieldSpecGet(_call2$self = _call2.self, Foo, _m)) === null || _classStaticPrivateFi43 === void 0 ? void 0 : _classStaticPrivateFi43.call(_call2$self);
    (_getSelf5 = (_ref27 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref27 === void 0 ? void 0 : _ref27.getSelf()) === null || _getSelf5 === void 0 ? void 0 : (_classStaticPrivateFi44 = _classStaticPrivateFieldSpecGet(_getSelf5$self = _getSelf5.self, Foo, _m)) === null || _classStaticPrivateFi44 === void 0 ? void 0 : _classStaticPrivateFi44.call(_getSelf5$self);
    (_getSelf6 = (_ref28 = fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self)) === null || _ref28 === void 0 ? void 0 : (_ref28$getSelf = _ref28.getSelf) === null || _ref28$getSelf === void 0 ? void 0 : _ref28$getSelf.call(_ref28)) === null || _getSelf6 === void 0 ? void 0 : (_classStaticPrivateFi45 = _classStaticPrivateFieldSpecGet(_getSelf6$self = _getSelf6.self, Foo, _m)) === null || _classStaticPrivateFi45 === void 0 ? void 0 : _classStaticPrivateFi45.call(_getSelf6$self);
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
