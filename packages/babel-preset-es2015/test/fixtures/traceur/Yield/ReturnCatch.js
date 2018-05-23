function* f () {
  try {
    yield 1;
  } catch (e) {
    f.x = 2;
  } finally {
    f.y = 3;
  }
}

var g = f();
expect(g.next()).toEqual({value: 1, done: false});
expect(g.return(3)).toEqual({value: 3, done: true});
expect(f.x).toBeUndefined();
expect(f.y).toBe(3);
