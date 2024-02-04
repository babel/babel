function dec(fn, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  expect(fn.name).toEqual(context.name);
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

const aContext = Foo['aContext'];
const bContext = Foo['bContext'];

expect(Foo.a()).toBe(2);
expect(aContext.access.get.call(Foo).call(Foo)).toBe(2);
expect(Foo.b()).toBe(2);
expect(bContext.access.get.call(Foo).call(Foo)).toBe(2);
Foo.value = 123;
expect(aContext.access.get.call(Foo).call(Foo)).toBe(124);
expect(Foo.a()).toBe(124);
expect(bContext.access.get.call(Foo).call(Foo)).toBe(124);
expect(Foo.b()).toBe(124);

expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('method');
expect(aContext.static).toBe(true);
expect(aContext.private).toBe(false);
expect(typeof aContext.addInitializer).toBe('function');

expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('method');
expect(bContext.static).toBe(true);
expect(bContext.private).toBe(false);
expect(typeof bContext.addInitializer).toBe('function');
