class Foo {
  static #x = 1;
  static #m = function() { return this.#x; };
  static #self = Foo;
  static self = Foo;
  static getSelf() { return this }

  static test() {
    const o = { Foo: Foo };
    const deep = { very: { o } };
    function fn() {
      return o;
    }
    function fnDeep() {
      return deep;
    }

    function f(o, r = o?.Foo.#m()) {
      return r;
    }

    function g(o, r = o?.Foo.#self.getSelf().#m?.()) {
      return r;
    }

    function h(fnDeep, r = fnDeep?.().very.o?.Foo?.#m()) {
      return r;
    }

    function i(fn, r = fn?.().Foo.#self?.getSelf()?.self.#m()) {
      return r;
    }

    function j(fn, r = (fn().Foo.#self.getSelf().self.#m)?.()) {
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
