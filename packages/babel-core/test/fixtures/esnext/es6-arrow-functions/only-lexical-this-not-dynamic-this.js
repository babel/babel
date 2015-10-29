var obj = {
  method: function() {
    return () => this;
  }
};

assert.strictEqual(obj.method()(), obj);
