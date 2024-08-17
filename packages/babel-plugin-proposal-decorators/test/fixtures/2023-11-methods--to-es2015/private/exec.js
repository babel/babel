let aContext;

function dec(fn, context) {
  expect(fn.name).toEqual(context.name);
  if (!aContext) aContext = context;
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

expect(aContext.access).not.toHaveProperty("set");

expect(foo.callA()).toBe(2);
foo.value = 123;
expect(foo.callA()).toBe(124);
