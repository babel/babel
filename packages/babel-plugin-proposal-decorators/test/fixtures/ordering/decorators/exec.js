var log = [];

function push(x) { log.push(x); return x; }

function logFinisher(a, b) {
  push(a);
  return function (el) { push(b); return el; };
}

@logFinisher(0, 23)
@logFinisher(1, 22)
class A {
  @logFinisher(2, 15)
  @logFinisher(3, 14)
  [push(4)] = "4";

  @logFinisher(5, 17)
  @logFinisher(6, 16)
  static [push(7)]() {}

  @logFinisher(8, 19)
  @logFinisher(9, 18)
  static [push(10)] = "10";

  @logFinisher(11, 21)
  @logFinisher(12, 20)
  [push(13)]() {}
}

var numsFrom0to9 = Array.from({ length: 24 }, (_, i) => i);
expect(log).toEqual(numsFrom0to9);
