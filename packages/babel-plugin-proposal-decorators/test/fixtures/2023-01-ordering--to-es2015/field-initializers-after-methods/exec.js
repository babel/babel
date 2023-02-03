var counter = 0;

@(x => x)
class A {
  foo = (() => {
    counter++;
    expect(typeof this.method).toBe("function");
    expect(this.foo).toBeUndefined();
    expect(this.bar).toBeUndefined();
    return "foo";
  })();

  method() {}

  bar = (() => {
    counter++;
    expect(typeof this.method).toBe("function");
    expect(this.foo).toBe("foo");
    expect(this.bar).toBeUndefined();
  })();
}

expect(counter).toBe(0);

new A();

expect(counter).toBe(2);
