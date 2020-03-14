function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
    var _o, _ref, _o2, _ref2, _o3, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _o4, _ref10, _o5, _ref11, _o6, _ref12, _ref13, _ref14, _o7, _ref15, _ref16, _ref17, _o8, _ref18, _ref19, _ref20, _o9, _ref21, _o10, _ref22, _ref23, _ref24, _o11, _ref25, _ref26, _ref27, _o12, _ref28, _ref29, _ref30, _o13, _ref31, _ref32, _ref33, _o14, _ref34, _ref35, _ref36, _o15, _ref37, _ref38, _ref39, _o16, _ref40, _ref41, _ref42, _fn, _ref43, _fn2, _ref44, _fn3, _ref45, _ref46, _ref47, _ref48, _ref49, _ref50, _ref51, _fn4, _ref52, _fn5, _ref53, _fn6, _ref54, _ref55, _ref56, _fn7, _ref57, _ref58, _ref59, _fn8, _ref60, _ref61, _ref62, _fn9, _ref63, _fn10, _ref64, _ref65, _ref66, _fn11, _ref67, _ref68, _ref69, _fn12, _ref70, _ref71, _ref72, _fn13, _ref73, _ref74, _ref75, _fn14, _ref76, _ref77, _ref78, _fn15, _ref79, _ref80, _ref81, _fn16, _ref82, _ref83, _ref84;

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

    (_ref = (_o = o)?.Foo, _o === void 0 || _o === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref, Foo, _x);
    (_ref2 = (_o2 = o)?.Foo, _o2 === void 0 || _o2 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref2, Foo, _x).toString;
    (_ref3 = (_o3 = o)?.Foo, _o3 === void 0 || _o3 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref3, Foo, _x).toString();
    (_ref5 = (_ref4 = deep?.very.o)?.Foo, _ref4 === void 0 || _ref4 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref5, Foo, _x);
    (_ref7 = (_ref6 = deep?.very.o)?.Foo, _ref6 === void 0 || _ref6 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref7, Foo, _x).toString;
    (_ref9 = (_ref8 = deep?.very.o)?.Foo, _ref8 === void 0 || _ref8 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref9, Foo, _x).toString();
    (_ref10 = (_o4 = o)?.Foo, _o4 === void 0 || _o4 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_ref10, Foo, _self), Foo, _x);
    (_ref11 = (_o5 = o)?.Foo, _o5 === void 0 || _o5 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_ref11, Foo, _self).self, Foo, _x);
    (_ref14 = (_ref13 = (_ref12 = (_o6 = o)?.Foo, _o6 === void 0 || _o6 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref12, Foo, _self))?.self, _ref13 === void 0 || _ref13 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref14, Foo, _x);
    (_ref17 = (_ref16 = (_ref15 = (_o7 = o)?.Foo, _o7 === void 0 || _o7 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref15, Foo, _self).self)?.self, _ref16 === void 0 || _ref16 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref17, Foo, _x);
    (_ref20 = (_ref19 = ((_ref18 = (_o8 = o)?.Foo, _o8 === void 0 || _o8 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref18, Foo, _self))?.self)?.self, _ref19 === void 0 || _ref19 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref20, Foo, _x);
    (_ref21 = (_o9 = o)?.Foo, _o9 === void 0 || _o9 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_ref21, Foo, _self).getSelf(), Foo, _x);
    (_ref24 = _ref23 = (_ref22 = (_o10 = o)?.Foo, _o10 === void 0 || _o10 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref22, Foo, _self).getSelf?.(), _ref23 === void 0 || _ref23 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref24, Foo, _x);
    (_ref27 = (_ref26 = (_ref25 = (_o11 = o)?.Foo, _o11 === void 0 || _o11 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref25, Foo, _self))?.getSelf(), _ref26 === void 0 || _ref26 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref27, Foo, _x);
    (_ref30 = _ref29 = ((_ref28 = (_o12 = o)?.Foo, _o12 === void 0 || _o12 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref28, Foo, _self))?.getSelf?.(), _ref29 === void 0 || _ref29 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref30, Foo, _x);
    (_ref33 = (_ref32 = (_ref31 = (_o13 = o)?.Foo, _o13 === void 0 || _o13 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref31, Foo, _self).getSelf())?.self, _ref32 === void 0 || _ref32 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref33, Foo, _x);
    (_ref36 = (_ref35 = (_ref34 = (_o14 = o)?.Foo, _o14 === void 0 || _o14 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref34, Foo, _self).getSelf?.())?.self, _ref35 === void 0 || _ref35 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref36, Foo, _x);
    (_ref39 = (_ref38 = ((_ref37 = (_o15 = o)?.Foo, _o15 === void 0 || _o15 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref37, Foo, _self))?.getSelf())?.self, _ref38 === void 0 || _ref38 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref39, Foo, _x);
    (_ref42 = (_ref41 = ((_ref40 = (_o16 = o)?.Foo, _o16 === void 0 || _o16 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref40, Foo, _self))?.getSelf?.())?.self, _ref41 === void 0 || _ref41 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref42, Foo, _x);
    (_ref43 = _fn = fn?.().Foo, _fn === void 0 || _fn === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref43, Foo, _x);
    (_ref44 = _fn2 = fn?.().Foo, _fn2 === void 0 || _fn2 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref44, Foo, _x).toString;
    (_ref45 = _fn3 = fn?.().Foo, _fn3 === void 0 || _fn3 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref45, Foo, _x).toString();
    (_ref47 = (_ref46 = fnDeep?.().very.o)?.Foo, _ref46 === void 0 || _ref46 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref47, Foo, _x);
    (_ref49 = (_ref48 = fnDeep?.().very.o)?.Foo, _ref48 === void 0 || _ref48 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref49, Foo, _x).toString;
    (_ref51 = (_ref50 = fnDeep?.().very.o)?.Foo, _ref50 === void 0 || _ref50 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref51, Foo, _x).toString();
    (_ref52 = _fn4 = fn?.().Foo, _fn4 === void 0 || _fn4 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_ref52, Foo, _self), Foo, _x);
    (_ref53 = _fn5 = fn?.().Foo, _fn5 === void 0 || _fn5 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_ref53, Foo, _self).self, Foo, _x);
    (_ref56 = (_ref55 = (_ref54 = _fn6 = fn?.().Foo, _fn6 === void 0 || _fn6 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref54, Foo, _self))?.self, _ref55 === void 0 || _ref55 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref56, Foo, _x);
    (_ref59 = (_ref58 = (_ref57 = _fn7 = fn?.().Foo, _fn7 === void 0 || _fn7 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref57, Foo, _self).self)?.self, _ref58 === void 0 || _ref58 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref59, Foo, _x);
    (_ref62 = (_ref61 = ((_ref60 = _fn8 = fn?.().Foo, _fn8 === void 0 || _fn8 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref60, Foo, _self))?.self)?.self, _ref61 === void 0 || _ref61 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref62, Foo, _x);
    (_ref63 = _fn9 = fn?.().Foo, _fn9 === void 0 || _fn9 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_ref63, Foo, _self).getSelf(), Foo, _x);
    (_ref66 = _ref65 = (_ref64 = _fn10 = fn?.().Foo, _fn10 === void 0 || _fn10 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref64, Foo, _self).getSelf?.(), _ref65 === void 0 || _ref65 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref66, Foo, _x);
    (_ref69 = (_ref68 = (_ref67 = _fn11 = fn?.().Foo, _fn11 === void 0 || _fn11 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref67, Foo, _self))?.getSelf(), _ref68 === void 0 || _ref68 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref69, Foo, _x);
    (_ref72 = _ref71 = ((_ref70 = _fn12 = fn?.().Foo, _fn12 === void 0 || _fn12 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref70, Foo, _self))?.getSelf?.(), _ref71 === void 0 || _ref71 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref72, Foo, _x);
    (_ref75 = (_ref74 = (_ref73 = _fn13 = fn?.().Foo, _fn13 === void 0 || _fn13 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref73, Foo, _self).getSelf())?.self, _ref74 === void 0 || _ref74 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref75, Foo, _x);
    (_ref78 = (_ref77 = (_ref76 = _fn14 = fn?.().Foo, _fn14 === void 0 || _fn14 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref76, Foo, _self).getSelf?.())?.self, _ref77 === void 0 || _ref77 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref78, Foo, _x);
    (_ref81 = (_ref80 = ((_ref79 = _fn15 = fn?.().Foo, _fn15 === void 0 || _fn15 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref79, Foo, _self))?.getSelf())?.self, _ref80 === void 0 || _ref80 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref81, Foo, _x);
    (_ref84 = (_ref83 = ((_ref82 = _fn16 = fn?.().Foo, _fn16 === void 0 || _fn16 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref82, Foo, _self))?.getSelf?.())?.self, _ref83 === void 0 || _ref83 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref84, Foo, _x);
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
