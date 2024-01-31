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
  static get #a() {
    return this.value;
  }

  static getA() {
    return this.#a;
  }
}

const aContext = Foo['#aContext'];

expect(aContext.access.has(Foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(Foo))).toBe(false);

expect(aContext.access.get(Foo)).toBe(2);
expect(() => aContext.access.get({})).toThrow(TypeError);
expect(Foo.getA()).toBe(2);
Foo.value = 123;
expect(aContext.access.get(Foo)).toBe(124);
expect(Foo.getA()).toBe(124);

expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('getter');
expect(aContext.static).toBe(true);
expect(aContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
