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
  a() {
    return this.value;
  }

  @dec
  ['b']() {
    return this.value;
  }
}

let foo = new Foo();

const aContext = foo['aContext'];
const bContext = foo['bContext'];

expect(aContext.access.has(foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(foo))).toBe(true);
expect(aContext.access.has({ a: 1 })).toBe(true);
expect(aContext.access.has(Object.create({ a: 1 }))).toBe(true);

expect(foo.a()).toBe(2);
expect(aContext.access.get(foo).call(foo)).toBe(2);
expect(foo.b()).toBe(2);
expect(bContext.access.get(foo).call(foo)).toBe(2);
foo.value = 123;
expect(aContext.access.get(foo).call(foo)).toBe(124);
expect(foo.a()).toBe(124);
expect(bContext.access.get(foo).call(foo)).toBe(124);
expect(foo.b()).toBe(124);

expect(aContext.access.get({})).toBe(undefined);
expect(aContext.access.get({ a: 3 })).toBe(3);

expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('method');
expect(aContext.static).toBe(false);
expect(aContext.private).toBe(false);
expect(typeof aContext.addInitializer).toBe('function');

expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('method');
expect(bContext.static).toBe(false);
expect(bContext.private).toBe(false);
expect(typeof bContext.addInitializer).toBe('function');
