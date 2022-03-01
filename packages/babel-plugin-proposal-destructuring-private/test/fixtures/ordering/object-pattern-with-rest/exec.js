var log = [];

function push(x, y = x) { log.push(x); return y; }

class C {
  static #x;
  static #y;
  static {
    var { [push(0)]: a = push(1), #x: {
      [push(3)]: b = push(4),
      #y: y = push(5),
      [push(6)]: c = push(7),
      #x: x = push(8),
      [push(9)]: d = push(10),
      ...e
    } = push(2, C), [push(11)]: d = push(12), #y: z = push(13), ...f } = C;
  }
}

var nums = Array.from({ length: 14 }, (_, i) => i);
expect(log).toStrictEqual(nums);
