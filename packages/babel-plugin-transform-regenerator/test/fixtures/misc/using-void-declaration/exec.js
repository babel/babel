function* gen(resource, list) {
  using void = resource, first = list[0];
  for (using void of list);
  for (using void = resource; false; );
  yield first;
}

async function fn(resource) {
  await using void = await resource;
}

const disposable = () => ({
  [Symbol.dispose || Symbol.for("Symbol.dispose")]() {},
  [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {},
});

const first = disposable();
const it = gen(disposable(), [first, disposable()]);
expect(it.next()).toEqual({ value: first, done: false });
expect(it.next()).toEqual({ value: undefined, done: true });

let awaited = false;
const resource = disposable();
resource.then = function (resolve) {
  awaited = true;
  delete this.then;
  resolve(this);
};

return fn(resource).then(result => {
  expect(result).toBeUndefined();
  expect(awaited).toBe(true);
});
