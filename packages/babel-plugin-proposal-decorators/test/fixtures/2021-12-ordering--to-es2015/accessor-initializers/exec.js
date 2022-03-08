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
      initialize: () => push(d)
    };
  };
}

@logClassDecoratorRun(0, 19, 29)
@logClassDecoratorRun(1, 18, 28)
class A {
  @logAccessorDecoratorRun(2, 11)
  @logAccessorDecoratorRun(3, 10)
  accessor a;

  @logAccessorDecoratorRun(4, 13, 21, 25)
  @logAccessorDecoratorRun(5, 12, 20, 24)
  static accessor b;

  @logAccessorDecoratorRun(6, 15, 23, 27)
  @logAccessorDecoratorRun(7, 14, 22, 26)
  static accessor #c;

  @logAccessorDecoratorRun(8, 17)
  @logAccessorDecoratorRun(9, 16)
  accessor #d;
}

var nums = Array.from({ length: 30 }, (_, i) => i);
expect(log).toEqual(nums);
