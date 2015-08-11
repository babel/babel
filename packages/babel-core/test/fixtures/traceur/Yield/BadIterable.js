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
assert.deepEqual(g1.next(), {value: 42, done: false});
assert.throws(() => g1.throw('ex1'), TypeError);
assert.isTrue(i1.closed);

function* f2() {
  try {
    yield 1;
  } finally {
    f2.closed = true;
  }
}
f2.closed = false;

var g2 = wrap(f2());
assert.deepEqual(g2.next(), {value: 1, done: false});
assert.throws(() => g2.throw('ex2'), 'ex2');
assert.isTrue(f2.closed);

