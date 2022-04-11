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
  @logAccessorDecoratorRun(2, 15, 31, 35)
  @logAccessorDecoratorRun(3, 14, 30, 34)
  accessor a;

  @logAccessorDecoratorRun(4, 11, 21, 25)
  @logAccessorDecoratorRun(5, 10, 20, 24)
  static accessor b;

  @logAccessorDecoratorRun(6, 13, 23, 27)
  @logAccessorDecoratorRun(7, 12, 22, 26)
  static accessor #c;

  @logAccessorDecoratorRun(8, 17, 33, 37)
  @logAccessorDecoratorRun(9, 16, 32, 36)
  accessor #d;
}

new A();

var nums = Array.from({ length: 38 }, (_, i) => i);
expect(log).toEqual(nums);
