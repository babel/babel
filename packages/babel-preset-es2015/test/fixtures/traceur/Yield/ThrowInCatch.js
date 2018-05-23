function* f() {
  try {
    yield 1;
    throw 'caught';
  } catch (e) {
    throw 'ex';
  } finally {
    f.x = 2;
  }
}

var g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(() => g.next()).toThrow('ex');
expect(f.x).toBe(2);
