function* run() {
  var captured;
  class C {
    static {
      for (let i = 0; i < 2; i++) captured = () => i;
    }
  }
  yield 0;
  return captured();
}

const iterator = run();
expect(iterator.next()).toEqual({ value: 0, done: false });
expect(iterator.next()).toEqual({ value: 1, done: true });
