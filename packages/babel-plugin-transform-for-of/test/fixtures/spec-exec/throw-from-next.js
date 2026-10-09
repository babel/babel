// When iterator.next() itself throws, IteratorClose must not run:
// return() is only called on abrupt completion of the loop *body*
// (ECMA-262 ForIn/OfBodyEvaluation).

// jest.fn isn't available in exec tests
function fn(impl = () => {}) {
  function f() {
    f.calls++;
    return impl();
  }
  f.calls = 0;
  return f;
}

const err = new Error();
let count = 0;

const iterator = {
  next: fn(() => {
    if (++count === 2) throw err;
    return { done: false, value: count };
  }),
  return: fn(() => ({ done: true })),
};

const obj = {
  [Symbol.iterator]: fn(() => iterator),
};

expect(() => {
  for (const x of obj) {
  }
}).toThrow(err);

expect(obj[Symbol.iterator].calls).toBe(1);
expect(iterator.next.calls).toBe(2);
expect(iterator.return.calls).toBe(0);
