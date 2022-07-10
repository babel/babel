var log = [];

function push(x, y = x) { log.push(x); return y; }

class C {
  static get a() { push(2) }
  static get b() { push(7) }
  static get c() { push(11) }
  static get d() { push(15) }
  static get #x() { push(4) };
  static get #y() { return push(9, C) };
  static {
    function *iterator() {
      push(0);
      yield C;
      push(13);
      yield C;
    }

    var [{ [push(1, "a")]: a = push(3), #x: {
      [push(6, "b")]: b = push(8),
      #y: y = push(-1),
      [push(10, "c")]: c = push(12)
    } = push(5, C) }, { [push(14, "d")]: d = push(16) }] = iterator();
  }
}

var nums = Array.from({ length: 16 }, (_, i) => i);
expect(log).toStrictEqual(nums);
