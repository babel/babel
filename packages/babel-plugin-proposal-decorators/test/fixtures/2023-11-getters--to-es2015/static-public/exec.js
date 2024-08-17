function dec(get, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  expect(get.name).toEqual("get " + context.name);
  return function () {
    return get.call(this) + 1;
  }
}

class Foo {
  static value = 1;

  @dec
  static get a() {
    return this.value;
  }

  @dec
  static get ['b']() {
    return this.value;
  }
}

const aContext = Foo['aContext'];
const bContext = Foo['bContext'];

expect(aContext.access).not.toHaveProperty("set");
expect(bContext.access).not.toHaveProperty("set");

expect(aContext.access.has(Foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(Foo))).toBe(true);
expect(aContext.access.has({ a: 1 })).toBe(true);
expect(aContext.access.has(Object.create({ a: 1 }))).toBe(true);

expect(Foo.a).toBe(2);
expect(Foo.b).toBe(2);
expect(aContext.access.get(Foo)).toBe(2);
expect(bContext.access.get(Foo)).toBe(2);
Foo.value = 123;
expect(Foo.a).toBe(124);
expect(Foo.b).toBe(124);
expect(aContext.access.get(Foo)).toBe(124);
expect(bContext.access.get(Foo)).toBe(124);

expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('getter');
expect(aContext.static).toBe(true);
expect(aContext.private).toBe(false);
expect(typeof aContext.addInitializer).toBe('function');

expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('getter');
expect(bContext.static).toBe(true);
expect(bContext.private).toBe(false);
expect(typeof bContext.addInitializer).toBe('function');
