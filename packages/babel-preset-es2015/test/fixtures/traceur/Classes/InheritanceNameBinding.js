class NameBindingBase {}

class NameBindingDerived extends NameBindingBase {
  getX() { return this.x; }
}

// ----------------------------------------------------------------------------

var derived = new NameBindingDerived();
derived.x = 12;
expect(derived.getX()).toBe(12);
