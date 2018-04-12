var Base = {
  test: '1',
};

var obj = {
  bar() {
    return super.test++;
  }
};
Object.setPrototypeOf(obj, Base);

assert.strictEqual(obj.bar(), 1);
assert.strictEqual(Base.test, '1');
assert.strictEqual(obj.test, 2);
