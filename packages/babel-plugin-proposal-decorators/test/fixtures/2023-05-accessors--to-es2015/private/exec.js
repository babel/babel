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
  accessor #a;

  @dec
  accessor #b = 123;
}

let foo = new Foo();

const aContext = foo['#aContext'];
const bContext = foo['#bContext'];

expect(aContext.access.has(foo)).toBe(true);
expect(aContext.access.has({})).toBe(false);
expect(aContext.access.has(Object.create(foo))).toBe(false);

expect(aContext.access.get(foo)).toBe(2);
expect(() => aContext.access.get({})).toThrow(TypeError);
aContext.access.set(foo, 123);
expect(aContext.access.get(foo)).toBe(125);
expect(() => aContext.access.set({}, 456)).toThrow(TypeError);
expect(aContext.name).toBe('#a');
expect(aContext.kind).toBe('accessor');
expect(aContext.static).toBe(false);
expect(aContext.private).toBe(true);
expect(typeof aContext.addInitializer).toBe('function');

expect(bContext.access.get(foo)).toBe(124);
bContext.access.set(foo, 123);
expect(bContext.access.get(foo)).toBe(125);
expect(bContext.name).toBe('#b');
expect(bContext.kind).toBe('accessor');
expect(bContext.static).toBe(false);
expect(bContext.private).toBe(true);
expect(typeof bContext.addInitializer).toBe('function');
