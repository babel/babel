function single ({a}, b) {
  var a = 3;
  assert.equal(a, 3);
  assert.equal(b, 0);
}
single({a :0}, 0);

function multiple ({a}, b) {
  var a = 3, b = 6;
  assert.equal(a, 3);
  assert.equal(b, 6);
}

multiple({a: 0}, 0);

(function argumentValueIsAvailableToo ({a}) {
  assert.equal(a, 99);
  var a = 3;
  assert.equal(a, 3);
})({a: 99});

function referenceToLaterParameter(a = b, b) {
  return [a, b]
}

assert.throws(() => referenceToLaterParameter(undefined, 1), ReferenceError)
assert.deepEqual(referenceToLaterParameter(1), [1, undefined])
