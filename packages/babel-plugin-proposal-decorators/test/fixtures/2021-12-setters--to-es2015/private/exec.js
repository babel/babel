function dec(set, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  return function (v) {
    return set.call(this, v + 1);
  }
}

class Foo {
  value = 1;

  @dec
  set #a(v) {
    return this.value = v;
  }

  setA(v) {
    this.#a = v;
  }
}

let foo = new Foo();

const aContext = foo['#aContext'];

expect(foo.value).toBe(1);
aContext.access.set.call(foo, 123);
expect(foo.value).toBe(124);
foo.setA(456);
expect(foo.value).toBe(457);

expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('setter');
expect(aContext.isStatic).toBe(false);
expect(aContext.isPrivate).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');
