var _x = babelHelpers.temporalUndefined,
    _m = babelHelpers.temporalUndefined,
    _self = babelHelpers.temporalUndefined;

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

      return o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(_o$Foo = o.Foo, Foo, _m).call(_o$Foo);
    })()) {
      return r;
    }

    function g(o, r = (() => o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).getSelf(), Foo, _m))()?.()) {
      return r;
    }

    function h(fnDeep, r = (() => {
      var _fnDeep$very$o$Foo;

      return (_fnDeep$very$o$Foo = fnDeep?.().very.o?.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(_fnDeep$very$o$Foo, Foo, _m).call(_fnDeep$very$o$Foo);
    })()) {
      return r;
    }

    function i(fn, r = (() => {
      var _getSelf, _getSelf$self;

      return (_getSelf = (() => fn === null || fn === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self))()?.getSelf()) === null || _getSelf === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(_getSelf$self = _getSelf.self, Foo, _m).call(_getSelf$self);
    })()) {
      return r;
    }

    function j(fn, r = (() => {
      var _babelHelpers$classCh;

      return babelHelpers.classCheckPrivateStaticAccess(_babelHelpers$classCh = babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).getSelf().self, Foo, _m)?.call(_babelHelpers$classCh);
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

_x = 1;

_m = function () {
  return babelHelpers.classCheckPrivateStaticAccess(this, Foo, _x);
};

_self = Foo;
babelHelpers.defineProperty(Foo, "self", Foo);
Foo.test();
