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
  set a(v) {
    return this.value = v;
  }

  @dec
  set ['b'](v) {
    return this.value = v;
  }
}

let foo = new Foo();

const aContext = foo['aContext'];
const bContext = foo['bContext'];

expect(foo.value).toBe(1);
foo.a = 123;
expect(foo.value).toBe(124);
foo.a = 456;
expect(foo.value).toBe(457);

expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('setter');
expect(aContext.isStatic).toBe(false);
expect(aContext.isPrivate).toBe(false);
expect(typeof aContext.addInitializer).toBe('function');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');

expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('setter');
expect(bContext.isStatic).toBe(false);
expect(bContext.isPrivate).toBe(false);
expect(typeof bContext.addInitializer).toBe('function');
expect(typeof bContext.setMetadata).toBe('function');
expect(typeof bContext.getMetadata).toBe('function');
