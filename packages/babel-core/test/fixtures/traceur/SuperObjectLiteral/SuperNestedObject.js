var p = {
  m() {
    this.name = 'p';
  },
  n() {
    return 'name';
  }
};

var p2 = {
  m() {
    this.name = 'p2';
  }
};

var o = {
  __proto__: p,
  name: 'o',
  m() {
    this.inner = {
      __proto__: p2,
      [super.n()]: 'inner',
      m() {
        super.m();
      }
    };
    super.m();
  }
};

o.m();
assert.equal(o.name, 'p');
assert.equal(o.inner.name, 'inner');

o.inner.m();
assert.equal(o.name, 'p');
assert.equal(o.inner.name, 'p2');
