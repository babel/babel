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
  superM() {
    return (function() {
      return super.m();
    })();
  }
  superX() {
    return (function() {
      return super.x;
    })();
  }
  superX2() {
    return (function() {
      return (function() {
        return super.x;
      })();
    })();
  }
  superX2F() {
    return function() {
      return (function() {
        return super.x;
      })();
    };
  }
  get superXprop() {
    return (function() {
      return super.x;
    })();
  }
  set superXprop(v) {
    return (function() {
      super.x = v;
    })();
  }
  constructor() {
    this.x = 10;
    this.derC = 3;
    (function() { super(); })();
  }
}

// ----------------------------------------------------------------------------

var obj = new SuperDerived();
assert.equal(41, obj.m());
assert.equal(40, obj.superM());

assert.equal(4, obj.baseX);
assert.equal(4, obj.x);
assert.equal(4, obj.superX());
assert.equal(4, obj.superX2());
assert.equal(4, obj.superX2F()());
assert.equal(4, obj.superXprop);

obj.superXprop = 5;
assert.equal(5, obj.baseX);
assert.equal(5, obj.x);
assert.equal(5, obj.superX());
assert.equal(5, obj.superX2());
assert.equal(5, obj.superX2F()());
assert.equal(5, obj.superXprop);

assert.equal(2, obj.baseC);
assert.equal(3, obj.derC);
