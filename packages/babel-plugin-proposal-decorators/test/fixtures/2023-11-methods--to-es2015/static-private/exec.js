let aContext;

function dec(fn, context) {
  expect(fn.name).toEqual(context.name);
  if (!aContext) aContext = context;
  return function () {
    return fn.call(this) + 1;
  }
}

class Foo {
  static value = 1;

  @dec
  static #a() {
    return this.value;
  }

  static callA() {
    return this.#a();
  }
}

expect(aContext.access).not.toHaveProperty("set");

expect(Foo.callA()).toBe(2);
Foo.value = 123;
expect(Foo.callA()).toBe(124);
