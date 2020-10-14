function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var _x = _classPrivateFieldLooseKey("x");

var _m = _classPrivateFieldLooseKey("m");

var _self = _classPrivateFieldLooseKey("self");

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

    function f(o, r = (() => o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(o.Foo, _m)[_m]())()) {
      return r;
    }

    function g(o, r = (() => o === null || o === void 0 ? void 0 : _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(o.Foo, _self)[_self].getSelf(), _m)[_m])()?.()) {
      return r;
    }

    function h(fnDeep, r = (() => {
      var _fnDeep$very$o$Foo;

      return (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : _classPrivateFieldLooseBase(_fnDeep$very$o$Foo, _m)[_m]();
    })()) {
      return r;
    }

    function i(fn, r = (() => {
      var _getSelf;

      return (_getSelf = (() => fn === null || fn === void 0 ? void 0 : _classPrivateFieldLooseBase(fn().Foo, _self)[_self])()?.getSelf()) === null || _getSelf === void 0 ? void 0 : _classPrivateFieldLooseBase(_getSelf.self, _m)[_m]();
    })()) {
      return r;
    }

    function j(fn, r = (() => _classPrivateFieldLooseBase(_classPrivateFieldLooseBase(fn().Foo, _self)[_self].getSelf().self, _m)[_m]?.())()) {
      return r;
    }

    f(o);
    g(o);
    h(fnDeep);
    i(fn);
    j(fn);
  }

}

Object.defineProperty(Foo, _x, {
  writable: true,
  value: 1
});
Object.defineProperty(Foo, _m, {
  writable: true,
  value: function () {
    return _classPrivateFieldLooseBase(this, _x)[_x];
  }
});
Object.defineProperty(Foo, _self, {
  writable: true,
  value: Foo
});
Foo.self = Foo;
Foo.test();
