function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o, _o2, _o3, _deep$very$o, _deep$very$o2, _deep$very$o3, _o4, _o5, _o6, _ref, _o7, _ref2, _o8, _self2, _o9, _o10, _classStaticPrivateFi, _ref3, _o11, _ref4, _o12, _getSelf, _ref5, _o13, _ref6, _o14, _classStaticPrivateFi2, _call, _o15, _getSelf2, _o16, _getSelf3, _fn, _fn2, _fn3, _fnDeep$very$o, _fnDeep$very$o2, _fnDeep$very$o3, _fn4, _fn5, _fn6, _ref7, _fn7, _ref8, _fn8, _self3, _fn9, _fn10, _classStaticPrivateFi3, _ref9, _fn11, _ref10, _fn12, _getSelf4, _ref11, _fn13, _ref12, _fn14, _classStaticPrivateFi4, _call2, _fn15, _getSelf5, _fn16, _getSelf6;

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

    (_o = o) === null || _o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o.Foo, Foo, _x);
    (_o2 = o) === null || _o2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o2.Foo, Foo, _x).toString;
    (_o3 = o) === null || _o3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o3.Foo, Foo, _x).toString();
    (_deep$very$o = deep?.very.o) === null || _deep$very$o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o.Foo, Foo, _x);
    (_deep$very$o2 = deep?.very.o) === null || _deep$very$o2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o2.Foo, Foo, _x).toString;
    (_deep$very$o3 = deep?.very.o) === null || _deep$very$o3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_deep$very$o3.Foo, Foo, _x).toString();
    (_o4 = o) === null || _o4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_o4.Foo, Foo, _self), Foo, _x);
    (_o5 = o) === null || _o5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_o5.Foo, Foo, _self).self, Foo, _x);
    (_ref = (_o6 = o) === null || _o6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o6.Foo, Foo, _self)) === null || _ref === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref.self, Foo, _x);
    (_ref2 = (_o7 = o) === null || _o7 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o7.Foo, Foo, _self).self) === null || _ref2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref2.self, Foo, _x);
    (_self2 = ((_o8 = o) === null || _o8 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o8.Foo, Foo, _self))?.self) === null || _self2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self2.self, Foo, _x);
    (_o9 = o) === null || _o9 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_o9.Foo, Foo, _self).getSelf(), Foo, _x);
    (_ref3 = (_o10 = o) === null || _o10 === void 0 ? void 0 : (_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(_o10.Foo, Foo, _self)).getSelf) === null || _ref3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref3.call(_classStaticPrivateFi), Foo, _x);
    (_ref4 = (_o11 = o) === null || _o11 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o11.Foo, Foo, _self)) === null || _ref4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref4.getSelf(), Foo, _x);
    (_getSelf = (_ref5 = (_o12 = o) === null || _o12 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o12.Foo, Foo, _self))?.getSelf) === null || _getSelf === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf.call(_ref5), Foo, _x);
    (_ref6 = (_o13 = o) === null || _o13 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o13.Foo, Foo, _self).getSelf()) === null || _ref6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref6.self, Foo, _x);
    (_call = ((_o14 = o) === null || _o14 === void 0 ? void 0 : (_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(_o14.Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi2)) === null || _call === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call.self, Foo, _x);
    (_getSelf2 = ((_o15 = o) === null || _o15 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o15.Foo, Foo, _self))?.getSelf()) === null || _getSelf2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf2.self, Foo, _x);
    (_getSelf3 = ((_o16 = o) === null || _o16 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o16.Foo, Foo, _self))?.getSelf?.()) === null || _getSelf3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf3.self, Foo, _x);
    (_fn = fn) === null || _fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn().Foo, Foo, _x);
    (_fn2 = fn) === null || _fn2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn2().Foo, Foo, _x).toString;
    (_fn3 = fn) === null || _fn3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn3().Foo, Foo, _x).toString();
    (_fnDeep$very$o = fnDeep?.().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o.Foo, Foo, _x);
    (_fnDeep$very$o2 = fnDeep?.().very.o) === null || _fnDeep$very$o2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o2.Foo, Foo, _x).toString;
    (_fnDeep$very$o3 = fnDeep?.().very.o) === null || _fnDeep$very$o3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o3.Foo, Foo, _x).toString();
    (_fn4 = fn) === null || _fn4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_fn4().Foo, Foo, _self), Foo, _x);
    (_fn5 = fn) === null || _fn5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_fn5().Foo, Foo, _self).self, Foo, _x);
    (_ref7 = (_fn6 = fn) === null || _fn6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn6().Foo, Foo, _self)) === null || _ref7 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref7.self, Foo, _x);
    (_ref8 = (_fn7 = fn) === null || _fn7 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn7().Foo, Foo, _self).self) === null || _ref8 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref8.self, Foo, _x);
    (_self3 = ((_fn8 = fn) === null || _fn8 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn8().Foo, Foo, _self))?.self) === null || _self3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_self3.self, Foo, _x);
    (_fn9 = fn) === null || _fn9 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_fn9().Foo, Foo, _self).getSelf(), Foo, _x);
    (_ref9 = (_fn10 = fn) === null || _fn10 === void 0 ? void 0 : (_classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(_fn10().Foo, Foo, _self)).getSelf) === null || _ref9 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref9.call(_classStaticPrivateFi3), Foo, _x);
    (_ref10 = (_fn11 = fn) === null || _fn11 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn11().Foo, Foo, _self)) === null || _ref10 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref10.getSelf(), Foo, _x);
    (_getSelf4 = (_ref11 = (_fn12 = fn) === null || _fn12 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn12().Foo, Foo, _self))?.getSelf) === null || _getSelf4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf4.call(_ref11), Foo, _x);
    (_ref12 = (_fn13 = fn) === null || _fn13 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn13().Foo, Foo, _self).getSelf()) === null || _ref12 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref12.self, Foo, _x);
    (_call2 = ((_fn14 = fn) === null || _fn14 === void 0 ? void 0 : (_classStaticPrivateFi4 = _classStaticPrivateFieldSpecGet(_fn14().Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi4)) === null || _call2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_call2.self, Foo, _x);
    (_getSelf5 = ((_fn15 = fn) === null || _fn15 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn15().Foo, Foo, _self))?.getSelf()) === null || _getSelf5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf5.self, Foo, _x);
    (_getSelf6 = ((_fn16 = fn) === null || _fn16 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn16().Foo, Foo, _self))?.getSelf?.()) === null || _getSelf6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf6.self, Foo, _x);
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
