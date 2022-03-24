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
  static accessor #a;

  @dec
  static accessor #b = 123;
}

const aContext = Foo['#aContext'];
const bContext = Foo['#bContext'];

expect(aContext.access.get.call(Foo)).toBe(2);
aContext.access.set.call(Foo, 123);
expect(aContext.access.get.call(Foo)).toBe(125);
expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('accessor');
expect(aContext.isStatic).toBe(true);
expect(aContext.isPrivate).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');
expect(typeof aContext.setMetadata).toBe('function');
expect(typeof aContext.getMetadata).toBe('function');

expect(bContext.access.get.call(Foo)).toBe(124);
bContext.access.set.call(Foo, 123);
expect(bContext.access.get.call(Foo)).toBe(125);
expect(bContext.name).toBe('#b');
expect(bContext.kind).toBe('accessor');
expect(bContext.isStatic).toBe(true);
expect(bContext.isPrivate).toBe(true);
expect(typeof bContext.addInitializer).toBe('function');
expect(typeof bContext.setMetadata).toBe('function');
expect(typeof bContext.getMetadata).toBe('function');
