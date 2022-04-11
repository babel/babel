function build(val) {
  return class {
    [this.key]() {
      return val;
    }
  };
}

var Class = build.call({ key: "foo" }, "bar");
expect(new Class().foo()).toBe("bar");
