function dec(fn, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  return function () {
    return fn.call(this) + 1;
  }
}

class Foo {
  value = 1;

  @dec
  #a() {
    return this.value;
  }

  callA() {
    return this.#a();
  }
}

let foo = new Foo();

const aContext = foo['#aContext'];

// First call gets the method, second call calls the method with correct `this`
expect(aContext.access.get.call(foo).call(foo)).toBe(2);
expect(foo.callA()).toBe(2);
foo.value = 123;
expect(aContext.access.get.call(foo).call(foo)).toBe(124);
expect(foo.callA()).toBe(124);

expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('method');
expect(aContext.isStatic).toBe(false);
expect(aContext.isPrivate).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');
