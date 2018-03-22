var obj = {
  method: function() {
    return () => (this, () => this);
  },

  method2: function() {
    return () => () => this;
  }
};

expect(obj.method()()()).toBe(obj);
expect(obj.method2()()()).toBe(obj);
