function dec({ get, set }, context) {
  context.addInitializer(function() {
    this[context.name + 'Context'] = context;
  });

  expect(get.name).toEqual("get " + context.name);
  expect(set.name).toEqual("set " + context.name);
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
expect(aContext.access.get.call(foo)).toBe(2);
foo.a = 123;
expect(foo.a).toBe(125);
expect(aContext.access.get.call(foo)).toBe(125);
aContext.access.set.call(foo, 456);
expect(foo.a).toBe(458);
expect(aContext.access.get.call(foo)).toBe(458);
expect(aContext.name).toBe('a');
expect(aContext.kind).toBe('accessor');
expect(aContext.static).toBe(false);
expect(aContext.private).toBe(false);
expect(typeof aContext.addInitializer).toBe('function');
expect(foo.hasOwnProperty('a')).toBe(false);
expect(Foo.prototype.hasOwnProperty('a')).toBe(true);

expect(foo.b).toBe(124);
foo.b = 123;
expect(foo.b).toBe(125);
expect(bContext.name).toBe('b');
expect(bContext.kind).toBe('accessor');
expect(bContext.static).toBe(false);
expect(bContext.private).toBe(false);
expect(typeof bContext.addInitializer).toBe('function');
expect(foo.hasOwnProperty('b')).toBe(false);
expect(Foo.prototype.hasOwnProperty('b')).toBe(true);

expect(foo.c).toBe(457);
foo.c = 456;
expect(foo.c).toBe(458);
expect(cContext.name).toBe('c');
expect(cContext.kind).toBe('accessor');
expect(cContext.static).toBe(false);
expect(cContext.private).toBe(false);
expect(typeof cContext.addInitializer).toBe('function');
expect(foo.hasOwnProperty('c')).toBe(false);
expect(Foo.prototype.hasOwnProperty('c')).toBe(true);
