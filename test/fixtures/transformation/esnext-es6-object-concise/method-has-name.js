var a = {
  b() {
    return 'c';
  }
};

assert.equal(a.b.name, 'b');
