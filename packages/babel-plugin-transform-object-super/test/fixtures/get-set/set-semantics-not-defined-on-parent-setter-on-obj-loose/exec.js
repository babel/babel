var Base = {
};

var value = 2;
var obj = {
  set test(v) {
    value = v;
  },

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

expect(obj.set()).toBe(3);
expect(Base.test).toBeUndefined();
expect(value).toBe(2);
expect(obj.test).toBeUndefined();
