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
});
Object.setPrototypeOf(obj, Base);

assert.equal(obj.set(), 3);
assert.equal(Base.test, undefined);
assert.equal(obj.test, 2);

const desc = Object.getOwnPropertyDescriptor(obj, 'test');
assert.equal(desc.configurable, true);
assert.equal(desc.writable, false);
