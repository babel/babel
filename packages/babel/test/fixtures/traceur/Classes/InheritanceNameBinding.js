class NameBindingBase {}

class NameBindingDerived extends NameBindingBase {
  getX() { return this.x; }
}

// ----------------------------------------------------------------------------

var derived = new NameBindingDerived();
derived.x = 12;
assert.equal(12, derived.getX());
