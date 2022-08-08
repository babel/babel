function dec({ get, set }, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  return {
    get() {
      return get.call(this) + 1;
    },

    set(v) {
      set.call(this, v + 1);
    },

    init(v) {
      return v ? v : 1;
    }
  }
}

class Foo {
  @dec
  accessor a;

  @dec
  accessor b = 123;

  @dec
  accessor ['c'] = 456;
}

let foo = new Foo();

const aContext = foo['aContext'];
const bContext = foo['bContext'];
const cContext = foo['cContext'];

expect(foo.a).toBe(2);
foo.a = 123;
expect(foo.a).toBe(125);
expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('accessor');
expect(aContext.isStatic).toBe(false);
expect(aContext.isPrivate).toBe(false);
expect(typeof aContext.addInitializer).toBe('function');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');
expect(foo.hasOwnProperty('a')).toBe(false);
expect(Foo.prototype.hasOwnProperty('a')).toBe(true);

expect(foo.b).toBe(124);
foo.b = 123;
expect(foo.b).toBe(125);
expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('accessor');
expect(bContext.isStatic).toBe(false);
expect(bContext.isPrivate).toBe(false);
expect(typeof bContext.addInitializer).toBe('function');
expect(typeof bContext.setMetadata).toBe('function');
expect(typeof bContext.getMetadata).toBe('function');
expect(foo.hasOwnProperty('b')).toBe(false);
expect(Foo.prototype.hasOwnProperty('b')).toBe(true);

expect(foo.c).toBe(457);
foo.c = 456;
expect(foo.c).toBe(458);
expect(cContext.name).toBe('c');
expect(cContext.kind).toBe('accessor');
expect(cContext.isStatic).toBe(false);
expect(cContext.isPrivate).toBe(false);
expect(typeof cContext.addInitializer).toBe('function');
expect(typeof cContext.setMetadata).toBe('function');
expect(typeof cContext.getMetadata).toBe('function');
expect(foo.hasOwnProperty('c')).toBe(false);
expect(Foo.prototype.hasOwnProperty('c')).toBe(true);
