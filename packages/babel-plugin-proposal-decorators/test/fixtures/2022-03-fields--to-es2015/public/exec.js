function dec(_v, context) {
  return function (v) {
    this[context.name + 'Context'] = context;
    return (v || 1) + 1;
  }
}

class Foo {
  @dec
  a;

  @dec
  b = 123;

  @dec
  ['c'] = 456;
}

let foo = new Foo();

const aContext = foo['aContext'];
const bContext = foo['bContext'];
const cContext = foo['cContext'];

expect(foo.a).toBe(2);
expect(aContext.access.get.call(foo)).toBe(2);
foo.a = 123;
expect(foo.a).toBe(123);
expect(aContext.access.get.call(foo)).toBe(123);
aContext.access.set.call(foo, 456);
expect(foo.a).toBe(456);
expect(aContext.access.get.call(foo)).toBe(456);
expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('field');
expect(aContext.static).toBe(false);
expect(aContext.private).toBe(false);
expect(typeof aContext.addInitializer).toBe('undefined');
expect(foo.hasOwnProperty('a')).toBe(true);
expect(Foo.prototype.hasOwnProperty('a')).toBe(false);

expect(foo.b).toBe(124);
foo.b = 123;
expect(foo.b).toBe(123);
expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('field');
expect(bContext.static).toBe(false);
expect(bContext.private).toBe(false);
expect(typeof bContext.addInitializer).toBe('undefined');
expect(foo.hasOwnProperty('b')).toBe(true);
expect(Foo.prototype.hasOwnProperty('b')).toBe(false);

expect(foo.c).toBe(457);
foo.c = 456;
expect(foo.c).toBe(456);
expect(cContext.name).toBe('c');
expect(cContext.kind).toBe('field');
expect(cContext.static).toBe(false);
expect(cContext.private).toBe(false);
expect(typeof cContext.addInitializer).toBe('undefined');
expect(foo.hasOwnProperty('c')).toBe(true);
expect(Foo.prototype.hasOwnProperty('c')).toBe(false);
