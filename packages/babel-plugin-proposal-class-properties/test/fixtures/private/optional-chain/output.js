function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static test() {
    var _o, _ref, _o2, _ref2, _o3, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _o4, _ref10, _o5, _ref11, _o6, _ref12, _ref13, _ref14, _o7, _ref15, _ref16, _ref17, _o8, _ref18, _ref19, _ref20;

    const o = {
      Foo: Foo
    };
    const deep = {
      very: {
        o
      }
    };
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
