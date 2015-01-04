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
assert.equal(1, obj.opt);
assert.equal(2, obj.instanceMethod());
assert.equal(3, obj.instanceMethod(3));

var obj2 = new OptionalParams(2);
assert.equal(2, obj2.opt);