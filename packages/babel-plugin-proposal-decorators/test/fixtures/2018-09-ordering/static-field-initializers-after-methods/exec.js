var counter = 0;

@(x => x)
class A {
  static foo = (() => {
    counter++;
    expect(typeof this.method).toBe("function");
    expect(this.foo).toBeUndefined();
    expect(this.bar).toBeUndefined();
    return "foo";
  })();

  static method() {}

  static bar = (() => {
    counter++;
    expect(typeof this.method).toBe("function");
    expect(this.foo).toBe("foo");
    expect(this.bar).toBeUndefined();
  })();
}

expect(counter).toBe(2);
