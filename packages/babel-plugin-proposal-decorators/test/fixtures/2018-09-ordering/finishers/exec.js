var log = [];

function push(x) { log.push(x); return x; }

function logFinisher(x) {
  return function (el) {
    return Object.assign(el, {
      finisher() { push(x); }
    });
  };
}

@logFinisher(9)
@logFinisher(8)
class A {
  @logFinisher(1)
  @logFinisher(0)
  foo;

  @logFinisher(3)
  @logFinisher(2)
  static bar() {}

  @logFinisher(5)
  @logFinisher(4)
  static baz;

  @logFinisher(7)
  @logFinisher(6)
  asd() {}
}

var numsFrom0to9 = Array.from({ length: 10 }, (_, i) => i);
expect(log).toEqual(numsFrom0to9);
