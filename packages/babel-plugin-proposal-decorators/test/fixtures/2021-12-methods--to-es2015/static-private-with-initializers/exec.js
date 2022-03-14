function dec(fn, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  return function () {
    return fn.call(this) + 1;
  }
}

class Foo {
  static value = 1;

  @dec
  static #a() {
    return this.value;
  }

  static callA() {
    return this.#a();
  }
}

const aContext = Foo['#aContext'];

// First call gets the method, second call calls the method with correct `this`
expect(aContext.access.get.call(Foo).call(Foo)).toBe(2);
expect(Foo.callA()).toBe(2);
Foo.value = 123;
expect(aContext.access.get.call(Foo).call(Foo)).toBe(124);
expect(Foo.callA()).toBe(124);

expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('method');
expect(aContext.isStatic).toBe(true);
expect(aContext.isPrivate).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');
