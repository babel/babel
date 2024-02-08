function dec(set, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  expect(set.name).toEqual("set " + context.name);
  return function (v) {
    return set.call(this, v + 1);
  }
}

class Foo {
  static value = 1;

  @dec
  static set a(v) {
    return this.value = v;
  }

  @dec
  static set ['b'](v) {
    return this.value = v;
  }
}

const aContext = Foo['aContext'];
const bContext = Foo['bContext'];

expect(aContext.access).not.toHaveProperty("get");
expect(bContext.access).not.toHaveProperty("get");

expect(aContext.access.has(Foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(Foo))).toBe(true);
expect(aContext.access.has({ a: 1 })).toBe(true);
expect(aContext.access.has(Object.create({ a: 1 }))).toBe(true);

expect(Foo.value).toBe(1);
Foo.a = 123;
expect(Foo.value).toBe(124);
aContext.access.set(Foo, 456);
expect(Foo.value).toBe(457);

expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('setter');
expect(aContext.static).toBe(true);
expect(aContext.private).toBe(false);
expect(typeof aContext.addInitializer).toBe('function');

expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('setter');
expect(bContext.static).toBe(true);
expect(bContext.private).toBe(false);
expect(typeof bContext.addInitializer).toBe('function');
