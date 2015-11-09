class ConstructorA {
  constructor(x) {
    this.x = x;
  }
}

class ConstructorB extends ConstructorA {
  constructor(x, y) {
    super(x);
    this.y = y;
  }
}

// ----------------------------------------------------------------------------

var a = new ConstructorA('ax');
assert.equal('ax', a.x);
assert.isFalse(a.hasOwnProperty('y'));

var b = new ConstructorB('bx', 'by');
assert.equal('bx', b.x);
assert.equal('by', b.y);
