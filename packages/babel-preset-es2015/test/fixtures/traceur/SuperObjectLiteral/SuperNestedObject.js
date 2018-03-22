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
expect(o.name).toBe('p');
expect(o.inner.name).toBe('inner');

o.inner.m();
expect(o.name).toBe('p');
expect(o.inner.name).toBe('p2');
