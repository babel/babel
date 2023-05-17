function dec(fn, context) {
  return function () {
    return fn.call(this) + 1;
  }
}

class Foo {
  static value = 1;

  @dec
  static a() {
    return this.value;
  }

  @dec
  static ['b']() {
    return this.value;
  }
}

expect(Foo.a()).toBe(2);
expect(Foo.b()).toBe(2);
Foo.value = 123;
expect(Foo.a()).toBe(124);
expect(Foo.b()).toBe(124);
