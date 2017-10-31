function build(val) {
  return class {
    [this.key]() {
      return val;
    }
  };
}

var Class = build.call({ key: "foo" }, "bar");
assert.equal(new Class().foo(), "bar");
