var obj = {
  name: 'x',
  method() {
    var f = (x) => ({[this.name]: x});

    var o = f(1);
    assert.equal(1, o.x);

    this.name = 2;
    o = f(3);
    assert.equal(3, o[2]);
  }
};

obj.method();
