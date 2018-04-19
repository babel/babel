var obj = {
  name: 'x',
  method() {
    var f = (x) => ({[this.name]: x});

    var o = f(1);
    expect(1).toBe(o.x);

    this.name = 2;
    o = f(3);
    expect(3).toBe(o[2]);
  }
};

obj.method();
