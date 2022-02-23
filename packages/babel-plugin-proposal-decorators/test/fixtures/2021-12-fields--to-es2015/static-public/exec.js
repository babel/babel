function dec(_v, context) {
  return function (v) {
    this[context.name + 'Context'] = context;
    return (v || 1) + 1;
  }
}

class Foo {
  @dec
  static a;

  @dec
  static b = 123;

  @dec
  static ['c'] = 456;
}

const aContext = Foo['aContext'];
const bContext = Foo['bContext'];
const cContext = Foo['cContext'];

expect(Foo.a).toBe(2);
Foo.a = 123;
expect(Foo.a).toBe(123);
expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('field');
expect(aContext.isStatic).toBe(true);
expect(aContext.isPrivate).toBe(false);
expect(typeof aContext.addInitializer).toBe('undefined');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');
expect(Foo.hasOwnProperty('a')).toBe(true);

expect(Foo.b).toBe(124);
Foo.b = 123;
expect(Foo.b).toBe(123);
expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('field');
expect(bContext.isStatic).toBe(true);
expect(bContext.isPrivate).toBe(false);
expect(typeof bContext.addInitializer).toBe('undefined');
expect(typeof bContext.setMetadata).toBe('function');
expect(typeof bContext.getMetadata).toBe('function');
expect(Foo.hasOwnProperty('b')).toBe(true);

expect(Foo.c).toBe(457);
Foo.c = 456;
expect(Foo.c).toBe(456);
expect(cContext.name).toBe('c');
expect(cContext.kind).toBe('field');
expect(cContext.isStatic).toBe(true);
expect(cContext.isPrivate).toBe(false);
expect(typeof cContext.addInitializer).toBe('undefined');
expect(typeof cContext.setMetadata).toBe('function');
expect(typeof cContext.getMetadata).toBe('function');
expect(Foo.hasOwnProperty('c')).toBe(true);
