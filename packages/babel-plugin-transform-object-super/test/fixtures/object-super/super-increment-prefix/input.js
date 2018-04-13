var Base = {
  test: '1',
};

var obj = {
  bar() {
    return ++super.test;
  }
};
Object.setPrototypeOf(obj, Base);

expect(obj.bar()).toBe(2);
expect(Base.test).toBe('1');
expect(obj.test).toBe(2);
