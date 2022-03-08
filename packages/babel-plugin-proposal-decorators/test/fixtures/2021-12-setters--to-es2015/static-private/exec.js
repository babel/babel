function dec(set, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

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

expect(Foo.value).toBe(1);
aContext.access.set.call(Foo, 123);
expect(Foo.value).toBe(124);
Foo.setA(456);
expect(Foo.value).toBe(457);

expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('setter');
expect(aContext.isStatic).toBe(true);
expect(aContext.isPrivate).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');
