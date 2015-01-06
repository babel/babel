var obj = {
  method: function() {
    return () => (this, () => this);
  },

  method2: function() {
    return () => () => this;
  }
};

assert.strictEqual(obj.method()()(), obj);
assert.strictEqual(obj.method2()()(), obj);
