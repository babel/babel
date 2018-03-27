var b = 1;

var a = {
  b() {
    return b;
  }
};

expect(a.b()).toBe(1);
