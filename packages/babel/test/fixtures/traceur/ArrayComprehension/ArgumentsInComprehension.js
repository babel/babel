// Options: --array-comprehension
// https://github.com/google/traceur-compiler/issues/1086

function f() {
  var a = [for (x of [1]) arguments[0]];
  var b = [for (x of [1]) arguments[0]];
  assert.deepEqual(a, [arguments[0]]);
  assert.deepEqual(a, [42]);
  assert.deepEqual(a, b);
}

f(42);
