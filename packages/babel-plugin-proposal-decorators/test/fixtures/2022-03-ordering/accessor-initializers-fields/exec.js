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

function logFieldDecoratorRun(a, b) {
  push(a);
  return function (el) { push(b); return el; };
}

@logClassDecoratorRun(0, 19, 21)
@logClassDecoratorRun(1, 18, 20)
class A {
  @logAccessorDecoratorRun(2, 11, 23, 27)
  @logAccessorDecoratorRun(3, 10, 22, 26)
  accessor a;

  @logFieldDecoratorRun(4, 15)
  @logFieldDecoratorRun(5, 14)
  b;

  @logFieldDecoratorRun(6, 17)
  @logFieldDecoratorRun(7, 16)
  #c;

  @logAccessorDecoratorRun(8, 13, 25, 29)
  @logAccessorDecoratorRun(9, 12, 24, 28)
  accessor #d;

  constructor() {
    this.a = this.#d = null;
  }
}

var nums = Array.from({ length: 22 }, (_, i) => i);
expect(log).toEqual(nums);

new A();

var nums = Array.from({ length: 30 }, (_, i) => i);
expect(log).toEqual(nums);
