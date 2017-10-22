const actual = [];

const track = i => actual.push(i);

class MyClass {
  static [track(1)] = track(10);
  [track(2)] = track(0);
  get [track(3)]() {}
  set [track(4)](value) {}
  [track(5)] = track(0);
  static [track(6)] = track(11);
  static [track(7)] = track(12);
  [track(8)]() {}
  [track(9)] = track(0);
}

const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
assert.deepEqual(actual, expected);
