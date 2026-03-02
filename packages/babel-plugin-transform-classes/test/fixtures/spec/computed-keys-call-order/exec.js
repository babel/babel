var log = [];

class A {
  [log.push(1)]() {}
  static [log.push(2)]() {}
  [log.push(3)]() {}
  static [log.push(4)]() {}
}

expect(log).toEqual([1, 2, 3, 4]);

