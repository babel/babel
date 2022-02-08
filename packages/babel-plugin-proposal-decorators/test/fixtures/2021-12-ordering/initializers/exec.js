var log = [];

function push(x) { log.push(x); return x; }

function logDecoratorRun(a, b, c) {
  push(a);
  return function (el, { addInitializer }) {
    push(b);
    addInitializer(function () { push(c); });
    return el;
  };
}

@logDecoratorRun(0, 35, 45)
@logDecoratorRun(1, 34, 44)
class A {
  @logDecoratorRun(2, 19)
  @logDecoratorRun(3, 18)
  a() {};

  @logDecoratorRun(4, 21, 37)
  @logDecoratorRun(5, 20, 36)
  static b() {};

  @logDecoratorRun(6, 23, 39)
  @logDecoratorRun(7, 22, 38)
  static #c() {};

  @logDecoratorRun(8, 25)
  @logDecoratorRun(9, 24)
  #d() {};

  @logDecoratorRun(10, 27)
  @logDecoratorRun(11, 26)
  accessor e;

  @logDecoratorRun(12, 29, 41)
  @logDecoratorRun(13, 28, 40)
  static accessor f;

  @logDecoratorRun(14, 31, 43)
  @logDecoratorRun(15, 30, 42)
  static accessor #g;

  @logDecoratorRun(16, 33)
  @logDecoratorRun(17, 32)
  accessor #h;
}

var nums = Array.from({ length: 46 }, (_, i) => i);
expect(log).toEqual(nums);
