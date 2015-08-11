// Options: --array-comprehension
// https://github.com/google/traceur-compiler/issues/1086

var object = {};

function f() {
  var a = [for (x of [1]) this];
  var b = [for (x of [1]) this];
  assert.deepEqual(a, [this]);
  assert.deepEqual(a, [object]);
  assert.deepEqual(a, b);
}

f.call(object);
