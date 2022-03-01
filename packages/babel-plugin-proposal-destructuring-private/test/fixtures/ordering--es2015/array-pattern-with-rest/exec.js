var log = [];

function push(x, y = x) { log.push(x); return y; }

class C {
  static #x;
  static #y;
  static {
    var [{ [push(0)]: a = push(1), #x: {
      [push(3)]: b = push(4),
      #y: y = push(5),
      [push(6)]: c = push(7)
    } = push(2, C), [push(8)]: d = push(9) }, ...{ [push(10)]: e = push(11), ...f }] = [C];
  }
}

var nums = Array.from({ length: 12 }, (_, i) => i);
expect(log).toStrictEqual(nums);
