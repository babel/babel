class SimpleBase {}
class SimpleDerived extends SimpleBase {}

// ----------------------------------------------------------------------------

var derived = new SimpleDerived();
expect(derived instanceof SimpleDerived).toBe(true);
expect(derived instanceof SimpleBase).toBe(true);
expect(derived instanceof Object).toBe(true);
