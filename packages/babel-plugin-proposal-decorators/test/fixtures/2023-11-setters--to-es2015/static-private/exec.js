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
  static set #a(v) {
    return this.value = v;
  }

  static setA(v) {
    this.#a = v;
  }
}

const aContext = Foo['#aContext'];

expect(aContext.access).not.toHaveProperty("get");

expect(aContext.access.has(Foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(Foo))).toBe(false);

expect(Foo.value).toBe(1);
aContext.access.set(Foo, 123);
expect(Foo.value).toBe(124);
expect(() => aContext.access.set({}, 456)).toThrow(TypeError);
expect(Foo.value).toBe(124);
Foo.setA(456);
expect(Foo.value).toBe(457);

expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('setter');
expect(aContext.static).toBe(true);
expect(aContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
