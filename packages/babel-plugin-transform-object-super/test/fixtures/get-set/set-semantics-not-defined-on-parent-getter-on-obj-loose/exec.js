var Base = {
};

var called = false;
var obj = {
  get test() {
    called = true;
  },

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

assert.equal(obj.set(), 3);
assert.equal(called, false);
assert.equal(Base.test, undefined);
assert.equal(obj.test, undefined);
