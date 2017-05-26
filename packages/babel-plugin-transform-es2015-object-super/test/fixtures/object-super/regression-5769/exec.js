class A {}
class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
  }
  getThisX() { return this.x; }
  getSuperX() { return super.x; }
}

const b = new B();
assert.equal(b.getThisX(), 3);
assert.equal(b.getSuperX(), undefined);

class C {
  constructor() {
    this.x = 2;
    super.x = 3;
  }
  getThisX() { return this.x; }
  getSuperX() { return super.x; }
}

const c = new C();
assert.equal(c.getThisX(), 3);
assert.equal(c.getSuperX(), undefined);
