class ConstructorMember {
  constructor() {}
}

class DerivedConstructorMember extends ConstructorMember {
  constructor() {}
}

// ----------------------------------------------------------------------------

var cm = new ConstructorMember;
assert.equal(cm.constructor, ConstructorMember.prototype.constructor);
assert.isTrue(ConstructorMember.prototype.hasOwnProperty('constructor'));

for (var key in ConstructorMember) {
  assert.notEqual('constructor should not be enumerable', 'constructor', key);
}

var dcm = new DerivedConstructorMember;
assert.equal(dcm.constructor, DerivedConstructorMember.prototype.constructor);
assert.isTrue(DerivedConstructorMember.prototype.hasOwnProperty('constructor'));

for (var key in DerivedConstructorMember) {
  assert.notEqual('constructor should not be enumerable', 'constructor', key);
}
