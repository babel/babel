var o = {
  x: true,
  m() {
    return super.hasOwnProperty('x');
  }
};

expect(o.m()).toBe(true);
