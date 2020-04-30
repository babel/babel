let done = false, value = 0;

// jest.fn isn't available in exec tests
function fn(impl = () => {}) {
  function f() {
    f.calls++;
    return impl();
  }
  f.calls = 0;
  return f;
}

const iterator = {
  next: fn(() => ({ done, value })),
  throw: fn(),
  return: fn(() => { throw {} }),
};

const obj = {
  [Symbol.iterator]: fn(() => iterator),
};

const err = new Error();

expect(() => {
  for (const x of obj) {
    value++;
    if (value == 2) throw err;
  }
}).toThrow(err);

expect(obj[Symbol.iterator].calls).toBe(1);
expect(iterator.next.calls).toBe(2);
expect(iterator.throw.calls).toBe(0);
expect(iterator.return.calls).toBe(1);
