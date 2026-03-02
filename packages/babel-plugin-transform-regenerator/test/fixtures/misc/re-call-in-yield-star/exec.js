const innerIterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      return() {
        it.throw();
        return this.next();
      },
      next() {
        if (i++ < 2) return { done: false, value: "Hi 1" };
        return { done: true, value: "Hi 2" };
      }
    };
  }
};

function* gen() {
  yield* innerIterable;
  yield 1;
  yield 2;
}

var it = gen();

expect(function() {
  it.next();
  it.return();
}).toThrow()


