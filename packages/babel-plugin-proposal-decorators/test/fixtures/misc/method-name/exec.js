function decorator() {}

@decorator
class Foo {
  method() {}
}

expect(Foo.prototype.method.name).toBe("method");
