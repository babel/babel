const defaultValue = 1;
const obj = {
  set field(num = defaultValue) {
    this.num = num;
  }
};
obj.field = void 0;

expect(obj.num).toBe(defaultValue);
