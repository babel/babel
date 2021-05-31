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

expect(obj.set()).toBe(3);
expect(called).toBe(false);
expect(Base.test).toBeUndefined();
expect(obj.test).toBeUndefined();
