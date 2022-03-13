function dec(fn, context) {
  return function () {
    return fn.call(this) + 1;
  }
}

class Foo {
  value = 1;

  @dec
  #a() {
    return this.value;
  }

  callA() {
    return this.#a();
  }
}

let foo = new Foo();

expect(foo.callA()).toBe(2);
foo.value = 123;
expect(foo.callA()).toBe(124);
