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
  @logDecoratorRun(2, 27, 47)
  @logDecoratorRun(3, 26, 46)
  a() {};

  @logDecoratorRun(4, 19, 37)
  @logDecoratorRun(5, 18, 36)
  static b() {};

  @logDecoratorRun(6, 21, 39)
  @logDecoratorRun(7, 20, 38)
  static #c() {};

  @logDecoratorRun(8, 29, 49)
  @logDecoratorRun(9, 28, 48)
  #d() {};

  @logDecoratorRun(10, 31, 51)
  @logDecoratorRun(11, 30, 50)
  accessor e;

  @logDecoratorRun(12, 23, 41)
  @logDecoratorRun(13, 22, 40)
  static accessor f;

  @logDecoratorRun(14, 25, 43)
  @logDecoratorRun(15, 24, 42)
  static accessor #g;

  @logDecoratorRun(16, 33, 53)
  @logDecoratorRun(17, 32, 52)
  accessor #h;
}

new A();

var nums = Array.from({ length: 54 }, (_, i) => i);
expect(log).toEqual(nums);
