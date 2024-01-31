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

function logAccessorDecoratorRun(a, b, c, d) {
  push(a);
  return function (el, { addInitializer }) {
    push(b);
    addInitializer(function () {
      push(c);
    });
    return {
      init: () => push(d),
    };
  };
}

function logMethodDecoratorRun(a, b, c, d) {
  push(a);
  return function (el, { addInitializer }) {
    push(b);
    addInitializer(function () {
      push(c);
    });
    return () => (el(), push(d))
  };
}

@logClassDecoratorRun(0, 19, 21)
@logClassDecoratorRun(1, 18, 20)
class A {
  @logAccessorDecoratorRun(2, 11, 29, 26)
  @logAccessorDecoratorRun(3, 10, 28, 27)
  accessor a;

  @logMethodDecoratorRun(4, 13, 23, 35)
  @logMethodDecoratorRun(5, 12, 22, 34)
  b() {};

  @logMethodDecoratorRun(6, 15, 25, 37)
  @logMethodDecoratorRun(7, 14, 24, 36)
  #c() {};

  @logAccessorDecoratorRun(8, 17, 33, 30)
  @logAccessorDecoratorRun(9, 16, 32, 31)
  accessor #d;

  constructor() {
    this.b();
    this.#c();
    this.a = this.#d = null;
  }
}

var nums = Array.from({ length: 22 }, (_, i) => i);
expect(log).toEqual(nums);

new A();

var nums = Array.from({ length: 38 }, (_, i) => i);
expect(log).toEqual(nums);
