class Empty {}

class EmptyB extends Empty {
}

// ----------------------------------------------------------------------------

var e = new Empty();
assert.isNotNull(e);

for (var element in e) {
  assert.equal('constructor', element);
}

for (var element in Empty) {
  fail('Empty contains static member : ' + element);
}

// Instances should be different.
var e2 = new Empty();
assert.notEqual(e, e2);

assert.isTrue(e instanceof Empty);
assert.isFalse(e instanceof EmptyB);

var b = new EmptyB();

assert.isTrue(b instanceof Empty);
assert.isTrue(b instanceof EmptyB);
