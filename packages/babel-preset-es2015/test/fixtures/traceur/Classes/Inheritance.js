class SimpleBase {}
class SimpleDerived extends SimpleBase {}

// ----------------------------------------------------------------------------

var derived = new SimpleDerived();
expect(derived).toBeInstanceOf(SimpleDerived);
expect(derived).toBeInstanceOf(SimpleBase);
expect(derived).toBeInstanceOf(Object);
