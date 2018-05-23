var obj = {
  method: function() {
    return () => this;
  }
};

expect(obj.method()()).toBe(obj);
