function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o, _o$Foo, _o2, _o2$Foo, _o3, _o3$Foo, _ref, _ref$Foo, _ref2, _ref2$Foo, _ref3, _ref3$Foo, _o4, _classStaticPrivateFi, _o5, _classStaticPrivateFi2, _o6, _ref4, _ref4$self, _o7, _ref5, _ref5$self, _o8, _ref6, _ref6$self, _o9, _classStaticPrivateFi3, _o10, _classStaticPrivateFi4, _ref7, _ref8, _o11, _ref9, _ref10, _o12, _ref11, _ref12, _ref11$call, _o13, _ref13, _ref13$self, _o14, _classStaticPrivateFi5, _ref14, _ref14$self, _o15, _ref15, _ref15$self, _o16, _ref16, _ref16$self, _fn, _ref17, _fn2, _ref18, _fn3, _ref19, _ref20, _ref20$Foo, _ref21, _ref21$Foo, _ref22, _ref22$Foo, _fn4, _classStaticPrivateFi6, _fn5, _classStaticPrivateFi7, _fn6, _ref23, _ref23$self, _fn7, _ref24, _ref24$self, _fn8, _ref25, _ref25$self, _fn9, _classStaticPrivateFi8, _fn10, _classStaticPrivateFi9, _ref26, _ref27, _fn11, _ref28, _ref29, _fn12, _ref30, _ref31, _ref30$call, _fn13, _ref32, _ref32$self, _fn14, _classStaticPrivateFi10, _ref33, _ref33$self, _fn15, _ref34, _ref34$self, _fn16, _ref35, _ref35$self;

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

    (_o = o) === null || _o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo = _o.Foo, Foo, _m).call(_o$Foo);
    (_o2 = o) === null || _o2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o2$Foo = _o2.Foo, Foo, _m).call(_o2$Foo).toString;
    (_o3 = o) === null || _o3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o3$Foo = _o3.Foo, Foo, _m).call(_o3$Foo).toString();
    (_ref = deep?.very.o) === null || _ref === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref$Foo = _ref.Foo, Foo, _m).call(_ref$Foo);
    (_ref2 = deep?.very.o) === null || _ref2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref2$Foo = _ref2.Foo, Foo, _m).call(_ref2$Foo).toString;
    (_ref3 = deep?.very.o) === null || _ref3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref3$Foo = _ref3.Foo, Foo, _m).call(_ref3$Foo).toString();
    (_o4 = o) === null || _o4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(_o4.Foo, Foo, _self), Foo, _m).call(_classStaticPrivateFi);
    (_o5 = o) === null || _o5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(_o5.Foo, Foo, _self).self, Foo, _m).call(_classStaticPrivateFi2);
    (_ref4 = (_o6 = o) === null || _o6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o6.Foo, Foo, _self)) === null || _ref4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref4$self = _ref4.self, Foo, _m).call(_ref4$self);
    (_ref5 = (_o7 = o) === null || _o7 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o7.Foo, Foo, _self).self) === null || _ref5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref5$self = _ref5.self, Foo, _m).call(_ref5$self);
    (_ref6 = ((_o8 = o) === null || _o8 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o8.Foo, Foo, _self))?.self) === null || _ref6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref6$self = _ref6.self, Foo, _m).call(_ref6$self);
    (_o9 = o) === null || _o9 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi3 = _classStaticPrivateFieldSpecGet(_o9.Foo, Foo, _self).getSelf(), Foo, _m).call(_classStaticPrivateFi3);
    (_ref7 = (_o10 = o) === null || _o10 === void 0 ? void 0 : (_classStaticPrivateFi4 = _classStaticPrivateFieldSpecGet(_o10.Foo, Foo, _self)).getSelf) === null || _ref7 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref8 = _ref7.call(_classStaticPrivateFi4), Foo, _m).call(_ref8);
    (_ref9 = (_o11 = o) === null || _o11 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o11.Foo, Foo, _self)) === null || _ref9 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref10 = _ref9.getSelf(), Foo, _m).call(_ref10);
    (_ref11 = (_ref12 = (_o12 = o) === null || _o12 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o12.Foo, Foo, _self))?.getSelf) === null || _ref11 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref11$call = _ref11.call(_ref12), Foo, _m).call(_ref11$call);
    (_ref13 = (_o13 = o) === null || _o13 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o13.Foo, Foo, _self).getSelf()) === null || _ref13 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref13$self = _ref13.self, Foo, _m).call(_ref13$self);
    (_ref14 = ((_o14 = o) === null || _o14 === void 0 ? void 0 : (_classStaticPrivateFi5 = _classStaticPrivateFieldSpecGet(_o14.Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi5)) === null || _ref14 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref14$self = _ref14.self, Foo, _m).call(_ref14$self);
    (_ref15 = ((_o15 = o) === null || _o15 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o15.Foo, Foo, _self))?.getSelf()) === null || _ref15 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref15$self = _ref15.self, Foo, _m).call(_ref15$self);
    (_ref16 = ((_o16 = o) === null || _o16 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o16.Foo, Foo, _self))?.getSelf?.()) === null || _ref16 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref16$self = _ref16.self, Foo, _m).call(_ref16$self);
    (_fn = fn) === null || _fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref17 = _fn().Foo, Foo, _m).call(_ref17);
    (_fn2 = fn) === null || _fn2 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref18 = _fn2().Foo, Foo, _m).call(_ref18).toString;
    (_fn3 = fn) === null || _fn3 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref19 = _fn3().Foo, Foo, _m).call(_ref19).toString();
    (_ref20 = fnDeep?.().very.o) === null || _ref20 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref20$Foo = _ref20.Foo, Foo, _m).call(_ref20$Foo);
    (_ref21 = fnDeep?.().very.o) === null || _ref21 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref21$Foo = _ref21.Foo, Foo, _m).call(_ref21$Foo).toString;
    (_ref22 = fnDeep?.().very.o) === null || _ref22 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref22$Foo = _ref22.Foo, Foo, _m).call(_ref22$Foo).toString();
    (_fn4 = fn) === null || _fn4 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi6 = _classStaticPrivateFieldSpecGet(_fn4().Foo, Foo, _self), Foo, _m).call(_classStaticPrivateFi6);
    (_fn5 = fn) === null || _fn5 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi7 = _classStaticPrivateFieldSpecGet(_fn5().Foo, Foo, _self).self, Foo, _m).call(_classStaticPrivateFi7);
    (_ref23 = (_fn6 = fn) === null || _fn6 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn6().Foo, Foo, _self)) === null || _ref23 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref23$self = _ref23.self, Foo, _m).call(_ref23$self);
    (_ref24 = (_fn7 = fn) === null || _fn7 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn7().Foo, Foo, _self).self) === null || _ref24 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref24$self = _ref24.self, Foo, _m).call(_ref24$self);
    (_ref25 = ((_fn8 = fn) === null || _fn8 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn8().Foo, Foo, _self))?.self) === null || _ref25 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref25$self = _ref25.self, Foo, _m).call(_ref25$self);
    (_fn9 = fn) === null || _fn9 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFi8 = _classStaticPrivateFieldSpecGet(_fn9().Foo, Foo, _self).getSelf(), Foo, _m).call(_classStaticPrivateFi8);
    (_ref26 = (_fn10 = fn) === null || _fn10 === void 0 ? void 0 : (_classStaticPrivateFi9 = _classStaticPrivateFieldSpecGet(_fn10().Foo, Foo, _self)).getSelf) === null || _ref26 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref27 = _ref26.call(_classStaticPrivateFi9), Foo, _m).call(_ref27);
    (_ref28 = (_fn11 = fn) === null || _fn11 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn11().Foo, Foo, _self)) === null || _ref28 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref29 = _ref28.getSelf(), Foo, _m).call(_ref29);
    (_ref30 = (_ref31 = (_fn12 = fn) === null || _fn12 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn12().Foo, Foo, _self))?.getSelf) === null || _ref30 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref30$call = _ref30.call(_ref31), Foo, _m).call(_ref30$call);
    (_ref32 = (_fn13 = fn) === null || _fn13 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn13().Foo, Foo, _self).getSelf()) === null || _ref32 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref32$self = _ref32.self, Foo, _m).call(_ref32$self);
    (_ref33 = ((_fn14 = fn) === null || _fn14 === void 0 ? void 0 : (_classStaticPrivateFi10 = _classStaticPrivateFieldSpecGet(_fn14().Foo, Foo, _self)).getSelf)?.call(_classStaticPrivateFi10)) === null || _ref33 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref33$self = _ref33.self, Foo, _m).call(_ref33$self);
    (_ref34 = ((_fn15 = fn) === null || _fn15 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn15().Foo, Foo, _self))?.getSelf()) === null || _ref34 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref34$self = _ref34.self, Foo, _m).call(_ref34$self);
    (_ref35 = ((_fn16 = fn) === null || _fn16 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fn16().Foo, Foo, _self))?.getSelf?.()) === null || _ref35 === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_ref35$self = _ref35.self, Foo, _m).call(_ref35$self);
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
