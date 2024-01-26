function dec(v, context) {
  context.addInitializer(function () {
    this[context.name + 'Context'] = context;
  });

  return v;
}

class Foo {
  @dec
  static accessor a;

  _b = 1;

  @dec
  set b(v) {
    this._b = v + 1;
  }
}

const obj = {};
const foo = new Foo();

const aContext = Foo.aContext;
const bContext = foo.bContext;

aContext.access.set(Foo, 123);

bContext.access.set(foo, 123);


aContext.access.set(obj, 456);
bContext.access.set(obj, 456);

expect(Foo.a).toBe(123);
expect(foo._b).toBe(124);

expect(obj.a).toBe(456);
expect(obj.b).toBe(456);
