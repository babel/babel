function* wrap(generator) {
  return yield *generator;
}

class BadIterable {
  constructor() {
    this.closed = false;
  }

  [Symbol.iterator]() {
    return {
      iterable: this,
      next(v) {
        return {value: 42, done: false};
      },
      // throw method missing
      return(v) {
        this.iterable.closed = true;
        return {value: undefined, done: true};
      }
    };
  }
}

var i1 = new BadIterable();
var g1 = wrap(i1);
expect(g1.next()).toEqual({value: 42, done: false});
expect(() => g1.throw('ex1')).toThrow(TypeError);
expect(i1.closed).toBe(true);

function* f2() {
  try {
    yield 1;
  } finally {
    f2.closed = true;
  }
}
f2.closed = false;

var g2 = wrap(f2());
expect(g2.next()).toEqual({value: 1, done: false});
expect(() => g2.throw('ex2')).toThrow();
expect(f2.closed).toBe(true);

