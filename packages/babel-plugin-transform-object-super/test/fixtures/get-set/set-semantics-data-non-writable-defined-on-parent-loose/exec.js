var Base = {
};
Object.defineProperty(Base, 'test', {
  value: 1,
  writable: false,
  configurable: true,
});

var obj = {
  test: 2,

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

expect(obj.set()).toBe(3);
expect(Base.test).toBe(1);
expect(obj.test).toBe(2);
