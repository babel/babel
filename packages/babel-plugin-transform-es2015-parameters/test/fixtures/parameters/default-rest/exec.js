const a = 1;
function rest(b = a, ...a) {
  return a, b;
}
assert.throws(() => rest(undefined, 1), ReferenceError);
