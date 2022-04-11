var Base = {
};

var obj = {
  set() {
    return super.test = 3;
  },
};
Object.defineProperty(obj, 'test', {
  value: 2,
  writable: false,
  configurable: true,
  enumerable: true,
});
Object.setPrototypeOf(obj, Base);

expect(obj.set()).toBe(3);
expect(Base.test).toBeUndefined();
expect(obj.test).toBe(2);

const desc = Object.getOwnPropertyDescriptor(obj, 'test');
expect(desc.configurable).toBe(true);
expect(desc.writable).toBe(false);
expect(desc.enumerable).toBe(true);
