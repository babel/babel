var log = [];

function push(x) {
  log.push(x);
  return x;
}

function logClassDecoratorRun(a, b, c) {
  push(a);
  return function (el, { addInitializer }) {
    push(b);
    addInitializer(function () {
      push(c);
    });
    return el;
  };
}

function logAccessorDecoratorRun(a, b, c, d, e, f) {
  push(a);
  return function ({ set }, { addInitializer }) {
    push(b);
    addInitializer(function () {
      push(c);
    });
    return {
      init: () => push(d),
      set(v) { push(e); const result = set.call(this, v); push(f); return result; }
    };
  };
}

function logFieldDecoratorRun(a, b) {
  push(a);
  return function (el) { push(b); return el; };
}

@logClassDecoratorRun(0, 11, 13)
@logClassDecoratorRun(1, 10, 12)
class A {
  @logAccessorDecoratorRun(2, 7, 17, 14, 22, 25)
  @logAccessorDecoratorRun(3, 6, 16, 15, 23, 24)
  accessor a;

  @logAccessorDecoratorRun(4, 9, 21, 18, 26, 29)
  @logAccessorDecoratorRun(5, 8, 20, 19, 27, 28)
  accessor #b;

  constructor() {
    this.a = null;
    this.#b = null;
  }
}

var nums = Array.from({ length: 14 }, (_, i) => i);
expect(log).toEqual(nums);

new A();

var nums = Array.from({ length: 30 }, (_, i) => i);
expect(log).toEqual(nums);
