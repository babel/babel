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
// TODO(jridgewell): Post #7687, uncomment this.
// assert.strictEqual(obj.test, 2);
