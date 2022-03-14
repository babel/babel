function dec(get, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

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

expect(aContext.access.get.call(Foo)).toBe(2);
expect(Foo.getA()).toBe(2);
Foo.value = 123;
expect(aContext.access.get.call(Foo)).toBe(124);
expect(Foo.getA()).toBe(124);

expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('getter');
expect(aContext.isStatic).toBe(true);
expect(aContext.isPrivate).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');
