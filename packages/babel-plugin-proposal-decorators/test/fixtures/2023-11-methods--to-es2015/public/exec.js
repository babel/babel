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
  a() {
    return this.value;
  }

  @dec
  ['b']() {
    return this.value;
  }
}

let foo = new Foo();

expect(aContext.access).not.toHaveProperty("set");

expect(foo.a()).toBe(2);
expect(foo.b()).toBe(2);
foo.value = 123;
expect(foo.a()).toBe(124);
expect(foo.b()).toBe(124);
