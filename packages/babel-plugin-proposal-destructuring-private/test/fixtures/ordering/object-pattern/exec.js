var log = [];

function push(x, y = x) { log.push(x); return y; }

class C {
  static get a() { push(1) }
  static get b() { push(6) }
  static get c() { push(10) }
  static get d() { push(13) }
  static get #x() { push(3) };
  static get #y() { return push(8, C) };
  static {
    var { [push(0, "a")]: a = push(2), #x: {
      [push(5, "b")]: b = push(7),
      #y: y = push(-1),
      [push(9, "c")]: c = push(11)
    } = push(4, C), [push(12, "d")]: d = push(14) } = C;
  }
}

var nums = Array.from({ length: 15 }, (_, i) => i);
expect(log).toStrictEqual(nums);
