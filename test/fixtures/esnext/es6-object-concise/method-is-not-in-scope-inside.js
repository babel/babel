var b = 1;

var a = {
  b() {
    return b;
  }
};

assert.equal(a.b(), 1);
