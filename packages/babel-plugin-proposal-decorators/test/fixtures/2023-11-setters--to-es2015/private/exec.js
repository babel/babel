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

expect(aContext.access.has(foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(foo))).toBe(false);

expect(foo.value).toBe(1);
aContext.access.set(foo, 123);
expect(foo.value).toBe(124);
expect(() => aContext.access.set({}, 456)).toThrow(TypeError);
expect(foo.value).toBe(124);
foo.setA(456);
expect(foo.value).toBe(457);

expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('setter');
expect(aContext.static).toBe(false);
expect(aContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
