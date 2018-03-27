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
expect('ax').toBe(a.x);
expect(a).not.toHaveProperty('y');

var b = new ConstructorB('bx', 'by');
expect('bx').toBe(b.x);
expect('by').toBe(b.y);
