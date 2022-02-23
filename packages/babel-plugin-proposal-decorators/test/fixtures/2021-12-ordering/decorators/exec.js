var log = [];

function push(x) { log.push(x); return x; }

function logDecoratorRun(a, b) {
  push(a);
  return function (el) { push(b); return el; };
}

@logDecoratorRun(0, 21)
@logDecoratorRun(1, 20)
class A {
  @logDecoratorRun(2, 13)
  @logDecoratorRun(3, 12)
  [push(4)];

  @logDecoratorRun(5, 15)
  @logDecoratorRun(6, 14)
  static [push(7)];

  @logDecoratorRun(8, 17)
  @logDecoratorRun(9, 16)
  static #c;

  @logDecoratorRun(10, 19)
  @logDecoratorRun(11, 18)
  #d;
}

var nums = Array.from({ length: 22 }, (_, i) => i);
expect(log).toEqual(nums);
