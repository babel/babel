function makeMultiplier() {
  // `arguments` should refer to `makeMultiplier`'s arguments.
  return (n) => [].slice.call(arguments).reduce((a, b) => a * b) * n;
}

function toArray() {
  // Intentionally nest arrow functions to ensure `arguments` is put inside
  // `toArray`'s scope.
  return (() => (arguments, (() => [].slice.call(arguments)).call())).call();
}

function returnDotArguments(object) {
  // Ensure `arguments` is not treated as a reference to the magic value.
  return (() => object.arguments).call();
}

function returnArgumentsObject() {
  // Ensure `arguments` is not treated as a reference to the magic value.
  return (() => ({arguments: 1})).call();
}

function makeArgumentsReturner() {
  return (() => function() {
    return [].slice.call(arguments);
  }).call();
}

// i.e. 2 * 3 * 4 == 24, not 16 (4 * 4)
assert.equal(
  makeMultiplier(2, 3)(4),
  24,
  'ensure `arguments` is hoisted out to the first non-arrow scope'
);

assert.deepEqual(
  toArray(1, 2, 3),
  [1, 2, 3],
  'ensure `arguments` is hoisted out to the first non-arrow scope'
);

assert.equal(
  returnDotArguments({arguments: 1}),
  1,
  'member accesses with `arguments` property should not be replaced'
);

assert.deepEqual(
  returnArgumentsObject(),
  {arguments: 1},
  'object property keys named `arguments` should not be replaced'
);

assert.deepEqual(
  makeArgumentsReturner()(1, 2, 3),
  [1, 2, 3],
  'arguments should not be hoisted from inside non-arrow functions'
);
