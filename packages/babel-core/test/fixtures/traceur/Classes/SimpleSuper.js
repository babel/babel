class SuperBase {
  m() { return 40; }
  get x () { return this.baseX; }
  set x (value) { this.baseX = value; }
  constructor() {
    this.baseC = 2;
    this.baseX = 4;
  }
}

class SuperDerived extends SuperBase {
  m() { return 41; }
  superM() { return super.m(); }
  superX() { return super.x; }
  constructor() {
    super();
    this.x = 10;
    this.derC = 3;
  }
}

// ----------------------------------------------------------------------------

var obj = new SuperDerived();
assert.equal(41, obj.m());
assert.equal(40, obj.superM());
assert.equal(10, obj.baseX);
assert.equal(10, obj.x);
assert.equal(10, obj.superX());
assert.equal(2, obj.baseC);
assert.equal(3, obj.derC);
