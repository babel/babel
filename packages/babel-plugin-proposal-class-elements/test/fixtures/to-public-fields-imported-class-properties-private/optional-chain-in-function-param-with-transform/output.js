var _x = babelHelpers.temporalUndefined,
    _m = babelHelpers.temporalUndefined,
    _self = babelHelpers.temporalUndefined;

class Foo {
  static self = (_x = 1, _m = function () {
    return babelHelpers.classCheckPrivateStaticAccess(this, Foo, _x);
  }, _self = Foo, Foo);

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

    function g(o, r = (() => {
      var _ref;

      return (_ref = (() => o === null || o === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(babelHelpers.classCheckPrivateStaticAccess(o.Foo, Foo, _self).getSelf(), Foo, _m))()) === null || _ref === void 0 ? void 0 : _ref();
    })()) {
      return r;
    }

    function h(fnDeep, r = (() => {
      var _fnDeep$very$o$Foo, _fnDeep$very$o;

      return (_fnDeep$very$o$Foo = fnDeep === null || fnDeep === void 0 ? void 0 : (_fnDeep$very$o = fnDeep().very.o) === null || _fnDeep$very$o === void 0 ? void 0 : _fnDeep$very$o.Foo) === null || _fnDeep$very$o$Foo === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(_fnDeep$very$o$Foo, Foo, _m).call(_fnDeep$very$o$Foo);
    })()) {
      return r;
    }

    function i(fn, r = (() => {
      var _getSelf, _getSelf$self, _ref2;

      return (_getSelf = (_ref2 = (() => fn === null || fn === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self))()) === null || _ref2 === void 0 ? void 0 : _ref2.getSelf()) === null || _getSelf === void 0 ? void 0 : babelHelpers.classCheckPrivateStaticAccess(_getSelf$self = _getSelf.self, Foo, _m).call(_getSelf$self);
    })()) {
      return r;
    }

    function j(fn, r = (() => {
      var _babelHelpers$classCh, _babelHelpers$classCh2;

      return (_babelHelpers$classCh2 = babelHelpers.classCheckPrivateStaticAccess(_babelHelpers$classCh = babelHelpers.classCheckPrivateStaticAccess(fn().Foo, Foo, _self).getSelf().self, Foo, _m)) === null || _babelHelpers$classCh2 === void 0 ? void 0 : _babelHelpers$classCh2.call(_babelHelpers$classCh);
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

Foo.test();
