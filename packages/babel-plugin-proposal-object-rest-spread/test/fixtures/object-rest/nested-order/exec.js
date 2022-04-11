var result = "";

var obj = {
  get foo() {
    result += "foo"
  },
  a: {
    get bar() {
      result += "bar";
    }
  },
  b: {
    get baz() {
      result += "baz";
    }
  }
};

var { a: { ...bar }, b: { ...baz }, ...foo } = obj;

expect(result).toBe("barbazfoo");
