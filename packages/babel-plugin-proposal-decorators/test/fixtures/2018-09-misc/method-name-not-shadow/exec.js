function decorator() {}

var method = 1;

@decorator
class Foo {
  method() {
    return method;
  }
}

expect(new Foo().method()).toBe(1);
expect(Foo.prototype.method.name).toBe("method");
