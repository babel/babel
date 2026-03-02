function minusTwo({ set }) {
  return {
    set(v) {
      set.call(this, v - 2);
    },
    init(v) {
      return v - 2;
    },
  };
}

function timesFour({ set }) {
  return {
    set(v) {
      set.call(this, v * 4);
    },
    init(v) {
      return v * 4;
    },
  };
}

class Foo {
  @minusTwo @timesFour accessor bar = 5;
}
const foo = new Foo();
expect(foo.bar).toBe(12); // (5 - 2) * 4

foo.bar = 5;
expect(foo.bar).toBe(12); // (5 - 2) * 4
