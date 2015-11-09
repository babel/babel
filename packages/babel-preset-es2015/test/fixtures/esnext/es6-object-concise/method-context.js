var a = {
  b() {
    return this;
  }
};

var context = {};
assert.strictEqual(a.b(), a);
assert.strictEqual(a.b.call(context), context);