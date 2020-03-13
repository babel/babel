function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static test() {
    var _o, _ref, _o2, _ref2, _o3, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _o4, _ref10, _o5, _ref11, _o6, _ref12, _ref13, _ref14, _o7, _ref15, _ref16, _ref17, _o8, _ref18, _ref19, _ref20, _fn, _ref21, _fn2, _ref22, _fn3, _ref23, _ref24, _ref25, _ref26, _ref27, _ref28, _ref29, _fn4, _ref30, _fn5, _ref31, _fn6, _ref32, _ref33, _ref34, _fn7, _ref35, _ref36, _ref37, _fn8, _ref38, _ref39, _ref40;

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
    (_ref21 = (_fn = fn)?.().Foo, _fn === void 0 || _fn === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref21, Foo, _x);
    (_ref22 = (_fn2 = fn)?.().Foo, _fn2 === void 0 || _fn2 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref22, Foo, _x).toString;
    (_ref23 = (_fn3 = fn)?.().Foo, _fn3 === void 0 || _fn3 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref23, Foo, _x).toString();
    (_ref25 = (_ref24 = fnDeep?.().very.o)?.Foo, _ref24 === void 0 || _ref24 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref25, Foo, _x);
    (_ref27 = (_ref26 = fnDeep?.().very.o)?.Foo, _ref26 === void 0 || _ref26 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref27, Foo, _x).toString;
    (_ref29 = (_ref28 = fnDeep?.().very.o)?.Foo, _ref28 === void 0 || _ref28 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref29, Foo, _x).toString();
    (_ref30 = (_fn4 = fn)?.().Foo, _fn4 === void 0 || _fn4 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_ref30, Foo, _self), Foo, _x);
    (_ref31 = (_fn5 = fn)?.().Foo, _fn5 === void 0 || _fn5 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(_ref31, Foo, _self).self, Foo, _x);
    (_ref34 = (_ref33 = (_ref32 = (_fn6 = fn)?.().Foo, _fn6 === void 0 || _fn6 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref32, Foo, _self))?.self, _ref33 === void 0 || _ref33 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref34, Foo, _x);
    (_ref37 = (_ref36 = (_ref35 = (_fn7 = fn)?.().Foo, _fn7 === void 0 || _fn7 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref35, Foo, _self).self)?.self, _ref36 === void 0 || _ref36 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref37, Foo, _x);
    (_ref40 = (_ref39 = ((_ref38 = (_fn8 = fn)?.().Foo, _fn8 === void 0 || _fn8 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref38, Foo, _self))?.self)?.self, _ref39 === void 0 || _ref39 === null) ? void 0 : _classStaticPrivateFieldSpecGet(_ref40, Foo, _x);
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
