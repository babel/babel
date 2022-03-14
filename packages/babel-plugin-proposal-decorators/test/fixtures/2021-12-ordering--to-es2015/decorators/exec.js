var log = [];

function push(x) { log.push(x); return x; }

function logDecoratorRun(a, b) {
  push(a);
  return function (el) { push(b); return el; };
}

@logDecoratorRun(0, 19)
@logDecoratorRun(1, 18)
class A {
  @logDecoratorRun(2, 11)
  @logDecoratorRun(3, 10)
  a;

  @logDecoratorRun(4, 13)
  @logDecoratorRun(5, 12)
  static b;

  @logDecoratorRun(6, 15)
  @logDecoratorRun(7, 14)
  static #c;

  @logDecoratorRun(8, 17)
  @logDecoratorRun(9, 16)
  #d;
}

var nums = Array.from({ length: 20 }, (_, i) => i);
expect(log).toEqual(nums);
