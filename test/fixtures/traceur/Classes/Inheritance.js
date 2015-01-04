class SimpleBase {}
class SimpleDerived extends SimpleBase {}

// ----------------------------------------------------------------------------

var derived = new SimpleDerived();
assert.isTrue(derived instanceof SimpleDerived);
assert.isTrue(derived instanceof SimpleBase);
assert.isTrue(derived instanceof Object);
