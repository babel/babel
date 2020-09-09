function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

class Foo {
  static getSelf() {
    return this;
  }

  static test() {
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

    function f(o, r = (() => {
      var _o$Foo;

      return o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_o$Foo = o.Foo, Foo, _m).call(_o$Foo);
    })()) {
      return r;
    }

    function g(o, r = (() => {
      var _ref;

      return (_ref = (() => o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf(), Foo, _m))()) === null || _ref === void 0 ? void 0 : _ref();
    })()) {
      return r;
    }

    function h(fnDeep, r = (() => {
      var _fnDeep$very$o$Foo, _fnDeep$very$o;

      return (_fnDeep$very$o$Foo = fnDeep === null || fnDeep === void 0 ? void 0 : (_fnDeep$very$o = fnDeep().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : _fnDeep$very$o.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo, Foo, _m).call(_fnDeep$very$o$Foo);
    })()) {
      return r;
    }

    function i(fn, r = (() => {
      var _getSelf, _getSelf$self, _ref2;

      return (_getSelf = (_ref2 = (() => fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))()) === null || _ref2 === void 0 ? void 0 : _ref2.getSelf()) === null || _getSelf === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self = _getSelf.self, Foo, _m).call(_getSelf$self);
    })()) {
      return r;
    }

    function j(fn, r = (() => {
      var _classStaticPrivateFi, _classStaticPrivateFi2;

      return (_classStaticPrivateFi2 = _classStaticPrivateFieldSpecGet(_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf().self, Foo, _m)) === null || _classStaticPrivateFi2 === void 0 ? void 0 : _classStaticPrivateFi2.call(_classStaticPrivateFi);
    })()) {
      return r;
    }

    f(o);
    g(o);
    h(fnDeep);
    i(fn);
    j(fn);
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
