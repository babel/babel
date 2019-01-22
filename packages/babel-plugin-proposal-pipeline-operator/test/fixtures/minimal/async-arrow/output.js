function then(fn) {
  return async value => {
    return fn((await value));
  };
}

const _pipe = 1;

const _pipe2 = (async x => (await x) + 1)(_pipe);

var result = then(x => x + 1)(_pipe2);
result.then(val => {
  expect(val).toBe(3);
});
