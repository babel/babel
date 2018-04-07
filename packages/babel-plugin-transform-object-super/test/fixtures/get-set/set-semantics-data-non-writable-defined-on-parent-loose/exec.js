const Base = {
};
Object.defineProperty(Base, 'test', {
  value: 1,
  writable: false,
  configurable: true,
});

const obj = {
  test: 2,

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

assert.equal(obj.set(), 3);
assert.equal(Base.test, 1);
assert.equal(obj.test, 2);
