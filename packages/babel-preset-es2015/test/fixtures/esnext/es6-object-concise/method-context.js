var a = {
  b() {
    return this;
  }
};

var context = {};
expect(a.b()).toBe(a);
expect(a.b.call(context)).toBe(context);
