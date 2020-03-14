function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

class Foo {
  static test() {
    var _o, _o2, _o3, _ref, _ref2, _ref3, _o4, _o5, _o6, _ref4, _o7, _ref5, _o8, _ref6, _fn, _fn2, _fn3, _ref7, _ref8, _ref9, _fn4, _fn5, _fn6, _ref10, _fn7, _ref11, _fn8, _ref12;

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

    (_o = o) === null || _o === void 0 ? void 0 : _classPrivateFieldLooseBase(_o.Foo, _x)[_x];
    (_o2 = o) === null || _o2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o2.Foo, _x)[_x].toString;
    (_o3 = o) === null || _o3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o3.Foo, _x)[_x].toString();
    (_ref = deep?.very.o) === null || _ref === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref.Foo, _x)[_x];
    (_ref2 = deep?.very.o) === null || _ref2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref2.Foo, _x)[_x].toString;
    (_ref3 = deep?.very.o) === null || _ref3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref3.Foo, _x)[_x].toString();
    (_o4 = o) === null || _o4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_o4.Foo, _self)[_self], _x)[_x];
    (_o5 = o) === null || _o5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_o5.Foo, _self)[_self].self, _x)[_x];
    (_ref4 = (_o6 = o) === null || _o6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o6.Foo, _self)[_self]) === null || _ref4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref4.self, _x)[_x];
    (_ref5 = (_o7 = o) === null || _o7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o7.Foo, _self)[_self].self) === null || _ref5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref5.self, _x)[_x];
    (_ref6 = ((_o8 = o) === null || _o8 === void 0 ? void 0 : _classPrivateFieldLooseBase(_o8.Foo, _self)[_self])?.self) === null || _ref6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref6.self, _x)[_x];
    (_fn = fn) === null || _fn === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn().Foo, _x)[_x];
    (_fn2 = fn) === null || _fn2 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn2().Foo, _x)[_x].toString;
    (_fn3 = fn) === null || _fn3 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn3().Foo, _x)[_x].toString();
    (_ref7 = fnDeep?.().very.o) === null || _ref7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref7.Foo, _x)[_x];
    (_ref8 = fnDeep?.().very.o) === null || _ref8 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref8.Foo, _x)[_x].toString;
    (_ref9 = fnDeep?.().very.o) === null || _ref9 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref9.Foo, _x)[_x].toString();
    (_fn4 = fn) === null || _fn4 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_fn4().Foo, _self)[_self], _x)[_x];
    (_fn5 = fn) === null || _fn5 === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(_fn5().Foo, _self)[_self].self, _x)[_x];
    (_ref10 = (_fn6 = fn) === null || _fn6 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn6().Foo, _self)[_self]) === null || _ref10 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref10.self, _x)[_x];
    (_ref11 = (_fn7 = fn) === null || _fn7 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn7().Foo, _self)[_self].self) === null || _ref11 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref11.self, _x)[_x];
    (_ref12 = ((_fn8 = fn) === null || _fn8 === void 0 ? void 0 : _classPrivateFieldLooseBase(_fn8().Foo, _self)[_self])?.self) === null || _ref12 === void 0 ? void 0 : _classPrivateFieldLooseBase(_ref12.self, _x)[_x];
  }

}

var _x = _classPrivateFieldLooseKey("x");

var _self = _classPrivateFieldLooseKey("self");

Object.defineProperty(Foo, _x, {
  writable: true,
  value: 1
});
Object.defineProperty(Foo, _self, {
  writable: true,
  value: Foo
});
Foo.self = Foo;
Foo.test();
