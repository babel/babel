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

expect(aContext.access.get.call(foo)).toBe(2);
expect(foo.getA()).toBe(2);
foo.value = 123;
expect(aContext.access.get.call(foo)).toBe(124);
expect(foo.getA()).toBe(124);
expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('getter');
expect(aContext.isStatic).toBe(false);
expect(aContext.isPrivate).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');
