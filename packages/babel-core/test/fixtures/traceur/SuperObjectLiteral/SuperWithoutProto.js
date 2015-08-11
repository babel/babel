var o = {
  x: true,
  m() {
    return super.hasOwnProperty('x');
  }
};

assert.isTrue(o.m());
