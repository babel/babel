class Foo {
  #tag() {
    return this;
  }

  constructor() {
    const receiver = (this?.#tag)`tagged template`;
    expect(receiver).toBe(this);
  }

  static test(o) {
    return (o?.#tag)`tagged template`;
  }
}
const foo = new Foo();
expect(Foo.test(foo)).toBe(foo);
expect(() => Foo.test(null)).toThrow(TypeError);
