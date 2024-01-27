var log = [];

function push(x) { log.push(x); return x; }

function logClassDecoratorRun(a, b, c) {
  push(a);
  return function (el, { addInitializer }) {
    push(b);
    addInitializer(function () { push(c); });
    return el;
  };
}

function logAccessorDecoratorRun(a, b, c, d) {
  push(a);
  return function (el, { addInitializer }) {
    push(b);
    addInitializer(function () { push(c); });
    return {
      init: () => push(d)
    };
  };
}

@logClassDecoratorRun(0, 19, 29)
@logClassDecoratorRun(1, 18, 28)
class A {
  @logAccessorDecoratorRun(2, 15, 33, 30)
  @logAccessorDecoratorRun(3, 14, 32, 31)
  accessor a;

  @logAccessorDecoratorRun(4, 11, 23, 20)
  @logAccessorDecoratorRun(5, 10, 22, 21)
  static accessor b;

  @logAccessorDecoratorRun(6, 13, 27, 24)
  @logAccessorDecoratorRun(7, 12, 26, 25)
  static accessor #c;

  @logAccessorDecoratorRun(8, 17, 37, 34)
  @logAccessorDecoratorRun(9, 16, 36, 35)
  accessor #d;
}

var nums = Array.from({ length: 30 }, (_, i) => i);
expect(log).toEqual(nums);

new A();

var nums = Array.from({ length: 38 }, (_, i) => i);
expect(log).toEqual(nums);
