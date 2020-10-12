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

    function g(o, r = (() => o === null || o === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_classStaticPrivateFieldSpecGet(o.Foo, Foo, _self).getSelf(), Foo, _m))()?.()) {
      return r;
    }

    function h(fnDeep, r = (() => {
      var _fnDeep$very$o$Foo;

      return (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_fnDeep$very$o$Foo, Foo, _m).call(_fnDeep$very$o$Foo);
    })()) {
      return r;
    }

    function i(fn, r = (() => {
      var _getSelf, _getSelf$self;

      return (_getSelf = (() => fn === null || fn === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self))()?.getSelf()) === null || _getSelf === void 0 ? void 0 : _classStaticPrivateFieldSpecGet(_getSelf$self = _getSelf.self, Foo, _m).call(_getSelf$self);
    })()) {
      return r;
    }

    function j(fn, r = (() => {
      var _classStaticPrivateFi;

      return _classStaticPrivateFieldSpecGet(_classStaticPrivateFi = _classStaticPrivateFieldSpecGet(fn().Foo, Foo, _self).getSelf().self, Foo, _m)?.call(_classStaticPrivateFi);
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
