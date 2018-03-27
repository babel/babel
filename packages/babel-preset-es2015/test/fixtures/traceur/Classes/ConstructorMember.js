class ConstructorMember {
  constructor() {}
}

class DerivedConstructorMember extends ConstructorMember {
  constructor() {
    super();
  }
}

// ----------------------------------------------------------------------------

var cm = new ConstructorMember;
expect(cm.constructor).toBe(ConstructorMember.prototype.constructor);
expect(ConstructorMember.prototype).toHaveProperty('constructor');

for (var key in ConstructorMember) {
  expect('constructor should not be enumerable').not.toBe('constructor');
}

var dcm = new DerivedConstructorMember;
expect(dcm.constructor).toBe(DerivedConstructorMember.prototype.constructor);
expect(DerivedConstructorMember.prototype).toHaveProperty('constructor');

for (var key in DerivedConstructorMember) {
  expect('constructor should not be enumerable').not.toBe('constructor');
}
