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
foo.a = 123;
expect(foo.a).toBe(123);
expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('field');
expect(aContext.isStatic).toBe(false);
expect(aContext.isPrivate).toBe(false);
expect(typeof aContext.addInitializer).toBe('undefined');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');
expect(foo.hasOwnProperty('a')).toBe(true);
expect(Foo.prototype.hasOwnProperty('a')).toBe(false);

expect(foo.b).toBe(124);
foo.b = 123;
expect(foo.b).toBe(123);
expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('field');
expect(bContext.isStatic).toBe(false);
expect(bContext.isPrivate).toBe(false);
expect(typeof bContext.addInitializer).toBe('undefined');
expect(typeof bContext.setMetadata).toBe('function');
expect(typeof bContext.getMetadata).toBe('function');
expect(foo.hasOwnProperty('b')).toBe(true);
expect(Foo.prototype.hasOwnProperty('b')).toBe(false);

expect(foo.c).toBe(457);
foo.c = 456;
expect(foo.c).toBe(456);
expect(cContext.name).toBe('c');
expect(cContext.kind).toBe('field');
expect(cContext.isStatic).toBe(false);
expect(cContext.isPrivate).toBe(false);
expect(typeof cContext.addInitializer).toBe('undefined');
expect(typeof cContext.setMetadata).toBe('function');
expect(typeof cContext.getMetadata).toBe('function');
expect(foo.hasOwnProperty('c')).toBe(true);
expect(Foo.prototype.hasOwnProperty('c')).toBe(false);
