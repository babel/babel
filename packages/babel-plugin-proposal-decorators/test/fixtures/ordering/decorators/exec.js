var log = [];

function push(x) { log.push(x); return x; }

function logDecoratorRun(a, b) {
  push(a);
  return function (el) { push(b); return el; };
}

@logDecoratorRun(0, 23)
@logDecoratorRun(1, 22)
class A {
  @logDecoratorRun(2, 15)
  @logDecoratorRun(3, 14)
  [push(4)] = "4";

  @logDecoratorRun(5, 17)
  @logDecoratorRun(6, 16)
  static [push(7)]() {}

  @logDecoratorRun(8, 19)
  @logDecoratorRun(9, 18)
  static [push(10)] = "10";

  @logDecoratorRun(11, 21)
  @logDecoratorRun(12, 20)
  [push(13)]() {}
}

var numsFrom0to23 = Array.from({ length: 24 }, (_, i) => i);
expect(log).toEqual(numsFrom0to23);
