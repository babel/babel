function dec(get, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  return function () {
    return get.call(this) + 1;
  }
}

class Foo {
  value = 1;

  @dec
  get #a() {
    return this.value;
  }

  getA() {
    return this.#a;
  }
}

let foo = new Foo();

const aContext = foo['#aContext'];

expect(aContext.access.has(foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(foo))).toBe(false);

expect(aContext.access.get(foo)).toBe(2);
expect(() => aContext.access.get({})).toThrow(TypeError);
expect(foo.getA()).toBe(2);
foo.value = 123;
expect(aContext.access.get(foo)).toBe(124);
expect(foo.getA()).toBe(124);
expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('getter');
expect(aContext.static).toBe(false);
expect(aContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
