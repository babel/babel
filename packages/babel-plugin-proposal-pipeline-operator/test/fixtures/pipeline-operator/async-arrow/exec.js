function then(fn) {
  return async (value) => {
    return fn(await value);
  };
}

var result = 1
  |> (async (x) => await x + 1)
  |> then((x) => x + 1);

result.then(val => {
  assert.equal(val, 3);
});
