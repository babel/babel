let result = "";

const obj = {
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

const { a: { ...bar }, b: { ...baz }, ...foo } = obj;

assert.strictEqual(result, "barbazfoo");