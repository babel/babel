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
expect(makeMultiplier(2, 3)(4)).toBe(24);

expect(toArray(1, 2, 3)).toEqual([1, 2, 3]);

expect(returnDotArguments({arguments: 1})).toBe(1);

expect(returnArgumentsObject()).toEqual({arguments: 1});

expect(makeArgumentsReturner()(1, 2, 3)).toEqual([1, 2, 3]);
