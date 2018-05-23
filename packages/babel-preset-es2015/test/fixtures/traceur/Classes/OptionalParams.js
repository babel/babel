class OptionalParams {
  constructor(opt = 1) {
    this.opt = opt;
  }
  instanceMethod(opt = 2) {
    return opt;
  }
}

// ----------------------------------------------------------------------------

var obj = new OptionalParams();
expect(obj.opt).toBe(1);
expect(obj.instanceMethod()).toBe(2);
expect(obj.instanceMethod(3)).toBe(3);

var obj2 = new OptionalParams(2);
expect(obj2.opt).toBe(2);
